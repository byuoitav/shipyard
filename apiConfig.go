package shipyard

// APIRoom represents the room doc used by the AV Control API
// in order to control a given room
type APIRoom struct {
	ID           string
	ProxyBaseURL string
	Devices      map[string]APIDevice
}

// APIDevice is a slimmed down version of Device used by the
// AV Control API
type APIDevice struct {
	Driver  string
	Address string
	Ports   []string
}
