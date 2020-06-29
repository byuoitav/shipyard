package shipyard

// RoomConfig represents the program for a room that can be used
// by various UIs to control different states in the room
type RoomConfig struct {
	ID            string
	ControlPanels map[string]string
	ControlGroups map[string]ControlGroup
}

// ControlGroup represents a group of Devices and inputs. These groups
// are used for logical grouping and displaying on different UIs
type ControlGroup struct {
	Displays     []DisplayControl
	Audio        AudioControl
	PowerOff     ControlSet
	DefaultState ControlSet
}

// DisplayControl represents a Display and its associated controls
// for a given group
type DisplayControl struct {
	Name    string
	Icon    string
	Sources []DisplayControlSource
}

// DisplayControlSource represents a source and its associated controls
// in relation to a specific display
type DisplayControlSource struct {
	Name    string
	Icon    string
	Visible bool
	ControlSet
}

// AudioControl contains information about audio controls in the room
type AudioControl struct {
	MasterVolume ControlSet
}

// ControlSet represents the request to be made (both to the
// AV Control API and other arbitrary locations) in order to set the room
// to a given state
type ControlSet struct {
	APIRequest ControlAPIRequest
	Requests   []GenericControlRequest
}

// ControlAPIRequest contains the information necessary for making
// a request to the AV Control API
type ControlAPIRequest interface{}

// GenericControlRequest contains the information necessary to make a generic
// HTTP request in association with making state changes in a room
type GenericControlRequest struct {
	URL    string
	Method string
	Body   interface{}
}
