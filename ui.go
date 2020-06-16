package shipyard

// UIConfiguration represents the configuration for the pi UI
type UIConfiguration struct {
	ID      string
	Inputs  []UIIO
	Outputs []UIIO
	Panels  []UIPanel
	Presets []UIPreset
}

// UIPanel represents a UI Panel
type UIPanel struct {
	Hostname string
	UIPath   string
	Preset   string
}

// UIPreset represents a preset for the UI
type UIPreset struct {
	Name             string
	Icon             string
	Displays         []string
	sharableDisplays []string
	audioDevices     []string
	inputs           []string
}

// UIIO represents an io option for the UI
type UIIO struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
}
