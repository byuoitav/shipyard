package couch

import (
	"fmt"

	"github.com/byuoitav/shipyard"
)

const _templatesPath = "device-templates"

// deviceTemplate is the couch representation of a device template
type deviceTemplate struct {
	ID       string `json:"_id"`
	Template device `json:"template"`
}

// GetDeviceTemplate returns the requested device template from couch
func (s *Service) GetDeviceTemplate(id string) (shipyard.DeviceTemplate, error) {
	path := fmt.Sprintf("%s/%s", _templatesPath, id)

	t := deviceTemplate{}
	err := s.makeRequest("GET", path, nil, &t)
	if err != nil {
		return shipyard.DeviceTemplate{}, fmt.Errorf("Couch/GetDeviceTemplate make request: %w", err)
	}

	return convertDeviceTemplate(t), nil
}

// ListDeviceTemplates lists the ids of all the templates currently found in couch
func (s *Service) ListDeviceTemplates() ([]string, error) {
	path := fmt.Sprintf("%s/_all_docs", _templatesPath)

	// Make the request
	list := docList{}
	err := s.makeRequest("GET", path, nil, &list)
	if err != nil {
		return []string{}, fmt.Errorf("couch/ListDeviceTemplates: make request: %w", err)
	}

	// Parse into a slice of strings
	templates := []string{}
	for _, doc := range list.Rows {
		templates = append(templates, doc.ID)
	}

	return templates, nil
}

// convertDeviceTemplate converts the device template from it's local couch
// representation into a shipyard.DeviceTemplate
func convertDeviceTemplate(t deviceTemplate) shipyard.DeviceTemplate {
	return shipyard.DeviceTemplate{
		ID:       t.ID,
		Template: convertDevice(t.Template),
	}
}
