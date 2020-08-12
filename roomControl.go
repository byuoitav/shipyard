package shipyard

// RoomControlDoc represents a pared down view of a room that the AV API
// needs in order to successfully control a room
type RoomControlDoc struct {
	ID           string                   `json:"id"`
	ProxyBaseURL string                   `json:"proxyBaseURL"`
	Devices      map[string]DeviceControl `json:"devices"`
}

// DeviceControl represents a pared down set of information for a device
// that is necessary for the AV API to understand how to control the device
type DeviceControl struct {
	Driver  string   `json:"driver"`
	Address string   `json:"address"`
	Ports   []string `json:"ports,omitempty"`
}

// RoomControlCompiler represents the interface that an implementation needs to
// meet in order to be used as a compiler for a room control doc
type RoomControlCompiler interface {
	CompileRoomControlDoc(Room, []Device) (RoomControlDoc, error)
}
