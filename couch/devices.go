package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

const _devicesDB = "devices"

// device is the couch representation of a device
type device struct {
	Rev                string            `json:"_rev,omitempty"`
	ID                 string            `json:"_id"`
	Address            string            `json:"address"`
	Driver             string            `json:"driver"`
	PublicDescription  string            `json:"publicDescription"`
	PrivateDescription string            `json:"privateDescription"`
	Ports              []devicePort      `json:"ports"`
	Tags               map[string]string `json:"tags"`
}

// devicePort is the couch representation of a device port
type devicePort struct {
	Name     string   `json:"name"`
	Endpoint []string `json:"endpoint"`
	Incoming bool     `json:"incoming"`
	Type     string   `json:"string"`
}

func (s *Service) GetDevice(deviceID string) (shipyard.Device, error) {
	db := s.client.DB(context.TODO(), _devicesDB)
	dev := device{}
	err := db.Get(context.TODO(), deviceID).ScanDoc(&dev)
	if err != nil {
		// Not found error
		if kivik.StatusCode(err) == http.StatusNotFound {
			return shipyard.Device{}, shipyard.ErrNotFound
		}

		return shipyard.Device{}, fmt.Errorf("couch/GetDevice get doc: %w", err)
	}

	return convertDevice(dev), nil
}

func (s *Service) GetRoomDevices(roomID string) ([]shipyard.Device, error) {
	db := s.client.DB(context.TODO(), _devicesDB)
	// Format query
	q := query{
		Selector: map[string]interface{}{
			"_id": search{
				Regex: fmt.Sprintf("%s-", roomID),
			},
		},
		Limit: 1000,
	}

	// Make the request
	rows, err := db.Find(context.TODO(), q)
	if err != nil {
		return nil, fmt.Errorf("couch/GetRoomDevices couch request: %w", err)
	}

	// Convert all the devices
	devs := []shipyard.Device{}
	for rows.Next() {
		d := device{}
		err := rows.ScanDoc(&d)
		if err != nil {
			return nil, fmt.Errorf("couch/GetRoomDevices unmarshal: %w", err)
		}
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
	db := s.client.DB(context.TODO(), _devicesDB)

	// Check to see if the device already exists
	exDev := device{}
	err := db.Get(context.TODO(), dev.ID).ScanDoc(&exDev)
	if err != nil {
		// Some other error than "not found"
		if kivik.StatusCode(err) != http.StatusNotFound {
			return fmt.Errorf("couch/SaveDevice request to check: %w", err)
		}
	}

	// Whether the device exists or not, merge
	// Non-existing devices will be merged with an empty device
	cDev := mergeDevice(dev, exDev)

	// Save the room
	_, err = db.Put(context.TODO(), cDev.ID, cDev)
	if err != nil {
		return fmt.Errorf("couch/SaveDevice put device: %s", err)
	}

	return nil
}

// Merge a given shipyard.Device into an existing device
func mergeDevice(d shipyard.Device, cd device) device {
	cd.ID = d.ID
	cd.Address = d.Address
	cd.Driver = d.Driver
	cd.PublicDescription = d.PublicDescription
	cd.PrivateDescription = d.PrivateDescription
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
		ID:                 d.ID,
		Address:            d.Address,
		Driver:             d.Driver,
		PublicDescription:  d.PublicDescription,
		PrivateDescription: d.PrivateDescription,
		Tags:               d.Tags,
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
