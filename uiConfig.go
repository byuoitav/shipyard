package shipyard

type UIConfig struct {
	ID            string                  `json:"id"`
	ControlPanels map[string]string       `json:"controlPanels"`
	ControlGroups map[string]ControlGroup `json:"controlGroups"`
}

type UIControlGroup struct {
	PowerOff     ControlSet           `json:"powerOff"`
	DefaultState ControlSet           `json:"defaultState"`
	Displays     map[string]UIDisplay `json:"displays"`
	Inputs       []string             `json:"inputs"`
	Microphones  map[string][]string  `json:"microphones"`
	Cameras      []string             `json:"cameras"`
	MasterVolume MasterVolume         `json:"masterVolume"`
}

type MasterVolume struct {
	Device string `json:"device"`
	Block  string `json:"block"`
}

type UIDisplay struct {
	DefaultInput string `json:"defaultInput"`
}
