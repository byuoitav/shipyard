package shipyard

// Device represents a physical AV device and its configuration
type Device struct {
	ID                 string                           `json:"id"`
	Room               string                           `json:"room"`
	APIControllable    bool                             `json:"api_controllable"`
	PublicDescription  string                           `json:"publicDescription"`
	PrivateDescription string                           `json:"privateDescription"`
	Address            string                           `json:"address"`
	Commands           map[string]GenericControlRequest `json:"commands"`
	Presets            map[string]string                `json:"presets,omitempty"`
	Driver             string                           `json:"driver"`
	DyanmicPorts       bool                             `json:"dynamicPorts"`
	Ports              []DevicePort                     `json:"ports"`
	Tags               Tags                             `json:"tags"`
}

// DeviceTemplate represents a template for a device
type DeviceTemplate struct {
	ID       string `json:"id"`
	Template Device `json:"template"`
}

// DevicePort represents a port on a physical device
type DevicePort struct {
	ID        string         `json:"id"`
	Name      string         `json:"name"`
	Endpoints []PortEndpoint `json:"endpoints"`
	Incoming  bool           `json:"incoming"`
	Type      string         `json:"type"`
}

type PortEndpoint struct {
	Device string `json:"device"`
	Port   string `json:"port"`
}

// Tags are a set of arbitrary key value pairs used for storing extra information
type Tags map[string]string
