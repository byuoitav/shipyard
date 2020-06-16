package couch

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/byuoitav/shipyard"
)

const _devicesPath = "devices"

// deviceResponse represents the response from couch for a query of devices
type deviceResponse struct {
	Docs     []device `json:"docs"`
	Bookmark string   `json:"bookmark"`
	Warning  string   `json:"warning"`
}

// device is the couch representation of a device
type device struct {
	Rev     string            `json:"_rev,omitempty"`
	ID      string            `json:"_id"`
	Address string            `json:"address"`
	TypeID  string            `json:"typeID"`
	Proxy   map[string]string `json:"proxy"`
	Ports   []devicePort      `json:"ports"`
	Tags    map[string]string `json:"tags"`
}

// devicePort is the couch representation of a device port
type devicePort struct {
	Name     string `json:"name"`
	Endpoint string `json:"endpoint"`
	Incoming bool   `json:"incoming"`
	Type     string `json:"string"`
}

func (s *Service) GetDevice(deviceID string) (shipyard.Device, error) {
	path := fmt.Sprintf("%s/%s", _devicesPath, deviceID)

	dev := device{}
	err := s.makeRequest("GET", path, nil, &dev)
	if err != nil {
		return shipyard.Device{}, fmt.Errorf("couch/GetDevice make request: %w", err)
	}

	return convertDevice(dev), nil
}

func (s *Service) GetRoomDevices(roomID string) ([]shipyard.Device, error) {
	path := fmt.Sprintf("%s/_find", _devicesPath)

	// Format query
	q := query{
		Selector: map[string]interface{}{
			"_id": search{
				Regex: fmt.Sprintf("%s-", roomID),
			},
		},
		Limit: 1000,
	}
	body, err := json.Marshal(&q)
	if err != nil {
		return nil, fmt.Errorf("couch/GetRoomDevices query marshal: %w", err)
	}

	// Make the request
	res := deviceResponse{}
	err = s.makeRequest("POST", path, body, &res)
	if err != nil {
		return nil, fmt.Errorf("couch/GetRoomDevices couch request: %w", err)
	}

	// Convert all the devices
	devs := []shipyard.Device{}
	for _, d := range res.Docs {
		devs = append(devs, convertDevice(d))
	}

	return devs, nil
}

func (s *Service) ListRoomDevices(roomID string) ([]string, error) {
	devs, err := s.GetRoomDevices(roomID)
	if err != nil {
		return nil, fmt.Errorf("couch/ListRoomDevices getting devices: %w", err)
	}

	list := []string{}
	for _, d := range devs {
		list = append(list, d.ID)
	}

	return list, nil
}

func (s *Service) SaveDevice(dev shipyard.Device) error {
	// Check to see if the device already exists
	path := fmt.Sprintf("%s/%s", _devicesPath, dev.ID)

	exDev := device{}
	err := s.makeRequest("GET", path, nil, &exDev)
	if err != nil {
		// Some other error than "not found"
		if !errors.Is(err, shipyard.ErrNotFound) {
			return fmt.Errorf("couch/SaveDevice request to check: %w", err)
		}
	}

	// Whether the device exists or not, merge
	// Non-existing devices will be merged with an empty device
	cDev := mergeDevice(dev, exDev)

	// Save the room
	body, err := json.Marshal(cDev)
	if err != nil {
		return fmt.Errorf("couch/SaveDevice marshal device: %w", err)
	}

	res := putResponse{}
	err = s.makeRequest("PUT", path, body, &res)
	if err != nil {
		return fmt.Errorf("couch/SaveDevice put device: %s", err)
	}

	// Check for OK
	if !res.OK {
		return fmt.Errorf("couch/SaveDevice did not get ok back from couch")
	}

	return nil
}

// Merge a given shipyard.Device into an existing device
func mergeDevice(d shipyard.Device, cd device) device {
	cd.ID = d.ID
	cd.Address = d.Address
	cd.TypeID = d.TypeID
	cd.Proxy = d.Proxy
	cd.Tags = d.Tags
	cd.Ports = []devicePort{}

	for _, p := range d.Ports {
		cd.Ports = append(cd.Ports, devicePort{
			Name:     p.Name,
			Endpoint: p.Endpoint,
			Incoming: p.Incoming,
			Type:     p.Type,
		})
	}

	return cd
}

// Convert couch device to shipyard device
func convertDevice(d device) shipyard.Device {
	sd := shipyard.Device{
		ID:      d.ID,
		Address: d.Address,
		TypeID:  d.TypeID,
		Proxy:   d.Proxy,
		Tags:    d.Tags,
	}

	ports := []shipyard.DevicePort{}

	for _, p := range d.Ports {
		ports = append(ports, shipyard.DevicePort{
			Name:     p.Name,
			Endpoint: p.Endpoint,
			Incoming: p.Incoming,
			Type:     p.Type,
		})
	}

	sd.Ports = ports

	return sd
}
