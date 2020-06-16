package couch

import (
	"fmt"

	"github.com/byuoitav/shipyard"
)

// uiConfig - a representation of all the information needed to configure the touchpanel UI.
type uiConfig struct {
	ID                  string               `json:"_id,omitempty"`
	Api                 []string             `json:"api"`
	Panels              []panel              `json:"panels"`
	Presets             []preset             `json:"presets"`
	InputConfiguration  []ioConfig           `json:"inputConfiguration"`
	OutputConfiguration []ioConfig           `json:"outputConfiguration"`
	AudioConfiguration  []audioConfiguration `json:"audioConfiguration"`
	PseudoInputs        []pseudoInput        `json:"pseudoInputs,omitempty"`
}

// preset - a representation of what is controlled by this preset.
type preset struct {
	Name                    string              `json:"name"`
	Icon                    string              `json:"icon"`
	Displays                []string            `json:"displays"`
	ShareablePresets        []string            `json:"shareablePresets"`
	ShareableDisplays       []string            `json:"shareableDisplays"`
	AudioDevices            []string            `json:"audioDevices"`
	Inputs                  []string            `json:"inputs"`
	IndependentAudioDevices []string            `json:"independentAudioDevices,omitempty"`
	AudioGroups             map[string][]string `json:"audioGroups,omitempty"`
	VolumeMatches           []string            `json:"volumeMatches,omitempty"`
	Commands                commands            `json:"commands,omitempty"`
	Screens                 []string            `json:"screens"`
	Cameras                 []camera            `json:"cameras"`
}

// panel - a representation of a touchpanel and which preset it has.
type panel struct {
	Hostname string   `json:"hostname"`
	UIPath   string   `json:"uipath"`
	Preset   string   `json:"preset"`
	Features []string `json:"features"`
}

// commands - a representation of commands to be sent through the UI.
type commands struct {
	PowerOn        []configCommand `json:"powerOn,omitempty"`
	PowerOff       []configCommand `json:"powerOff,omitempty"`
	InputSame      []configCommand `json:"inputSame,omitempty"`
	InputDifferent []configCommand `json:"inputDifferent,omitempty"`
	Delay          int             `json:"json:delay,omitempty"`
}

// configCommand - ...I dunno, ask Danny.
type configCommand struct {
	Method   string                 `json:"method"`
	Port     int                    `json:"port"`
	Endpoint string                 `json:"endpoint"`
	Body     map[string]interface{} `json:"body"`
}

// audioConfiguration - a representation of how the audio is configured when using multiple displays.
type audioConfiguration struct {
	Display      string   `json:"display"`
	AudioDevices []string `json:"audioDevices"`
	RoomWide     bool     `json:"roomWide"`
}

// ioConfig is the couch representation of an io option on the UI
type ioConfig struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
}

// pseudoInput - a fake input I guess
type pseudoInput struct {
	Displayname string `json:"displayname"`
	Config      []struct {
		Input   string   `json:"input"`
		Outputs []string `json:"outputs"`
	} `json:"config"`
}

// template - the UI config and device list for a room for quick configuration.
type template struct {
	ID          string   `json:"_id"`
	Description string   `json:"description"`
	UIConfig    uiConfig `json:"uiconfig"`
	BaseTypes   []string `json:"base_types"`
}

type camera struct {
	DisplayName string `json:"displayName"`

	TiltUp      string `json:"tiltUp"`
	TiltDown    string `json:"tiltDown"`
	PanLeft     string `json:"panLeft"`
	PanRight    string `json:"panRight"`
	PanTiltStop string `json:"panTiltStop"`

	ZoomIn   string `json:"zoomIn"`
	ZoomOut  string `json:"zoomOut"`
	ZoomStop string `json:"zoomStop"`

	Presets []cameraPreset `json:"presets"`
}

type cameraPreset struct {
	DisplayName string `json:"displayName"`
	SetPreset   string `json:"setPreset"`
}

func (s *Service) GetUIConfiguration(roomID string) (shipyard.UIConfiguration, error) {
	return shipyard.UIConfiguration{}, fmt.Errorf("NOT IMPLEMENTED")
}

func (s *Service) SaveUIConfiguration(config shipyard.UIConfiguration) error {
	return fmt.Errorf("NOT IMPLEMENTED")
}

func mergeUIConf(ui shipyard.UIConfiguration, cUI uiConfig) uiConfig {
	cUI.ID = ui.ID

	// Inputs
	cUI.InputConfiguration = []ioConfig{}
	for _, i := range ui.Inputs {
		cUI.InputConfiguration = append(cUI.InputConfiguration, ioConfig{
			Name: i.Name,
			Icon: i.Icon,
		})
	}

	return cUI
}
