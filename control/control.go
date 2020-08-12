package control

import "github.com/byuoitav/shipyard"

type Service struct{}

// CompileRoomControlDoc takes a given room and its devices and
//returns a generated roomControlDoc
func (s *Service) CompileRoomControlDoc(r shipyard.Room, devs []shipyard.Device) (shipyard.RoomControlDoc, error) {

	doc := shipyard.RoomControlDoc{}
	doc.ProxyBaseURL = r.ProxyBaseURL
	doc.Devices = map[string]shipyard.DeviceControl{}

	for _, d := range devs {
		// Skip things that are not controllable by the AV Control API
		if !d.APIControllable {
			continue
		}
		dc := shipyard.DeviceControl{}
		dc.Address = d.Address
		dc.Driver = d.Driver

		// If the ports are dynamic then add the IDs
		if d.DyanmicPorts {
			dc.Ports = []string{}
			for _, p := range d.Ports {
				dc.Ports = append(dc.Ports, p.ID)
			}
		}

		doc.Devices[d.ID] = dc
	}

	return doc, nil
}
