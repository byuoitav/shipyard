package shipyard

// Room represents a physical room containing AV Equipment
type Room struct {
	ID           string `json:"id"`
	Designation  string `json:"designation"`
	Description  string `json:"description"`
	Notes        string `json:"notes"`
	ProxyBaseURL string `json:"proxyBaseURL"`
	Tags         Tags   `json:"tags"`
}

// Device represents a physical AV device and its configuration
type Device struct {
	ID           string       `json:"id"`
	Description  string       `json:"description"`
	Address      string       `json:"address"`
	Driver       string       `json:"driver"`
	DyanmicPorts bool         `json:"dynamicPorts"`
	Ports        []DevicePort `json:"ports"`
	Tags         Tags         `json:"tags"`
}

// DeviceTemplate represents a template for a device
type DeviceTemplate struct {
	ID       string `json:"id"`
	Template Device `json:"template"`
}

// DevicePort represents a port on a physical device
type DevicePort struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Endpoint string `json:"endpoint"`
	Incoming bool   `json:"incoming"`
	Type     string `json:"type"`
}

// Tags are a set of arbitrary key value pairs used for storing extra information
type Tags map[string]string
