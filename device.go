package shipyard

// Room represents a physical room containing AV Equipment
type Room struct {
	ID          string `json:"id"`
	Designation string `json:"designation"`
	Tags        Tags   `json:"tags"`
}

// Device represents a physical AV device and its configuration
type Device struct {
	ID      string       `json:"id"`
	Address string       `json:"address"`
	TypeID  string       `json:"typeID"`
	Proxy   ProxyConfig  `json:"proxy"`
	Ports   []DevicePort `json:"ports"`
	Tags    Tags         `json:"tags"`
}

// DeviceTemplate represents a template for a device
type DeviceTemplate struct {
	ID       string `json:"id"`
	Template Device `json:"template"`
}

// DevicePort represents a port on a physical device
type DevicePort struct {
	Name     string `json:"name"`
	Endpoint string `json:"endpoint"`
	Incoming bool   `json:"incoming"`
	Type     string `json:"type"`
}

// ProxyConfig is a mapping of host patterns to proxy hosts for proxying calls
type ProxyConfig map[string]string

// Tags are a set of arbitrary key value pairs used for storing extra information
type Tags map[string]string
