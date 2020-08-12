package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

const _templatesDB = "device-templates"

// deviceTemplate is the couch representation of a device template
type deviceTemplate struct {
	ID       string `json:"_id"`
	Template device `json:"template"`
}

// GetDeviceTemplate returns the requested device template from couch
func (s *Service) GetDeviceTemplate(id string) (shipyard.DeviceTemplate, error) {

	t := deviceTemplate{}
	err := s.client.DB(context.TODO(), _templatesDB).Get(context.TODO(), id).ScanDoc(&t)
	if err != nil {
		// Not found error
		if kivik.StatusCode(err) == http.StatusNotFound {
			return shipyard.DeviceTemplate{}, shipyard.ErrNotFound
		}
		return shipyard.DeviceTemplate{}, fmt.Errorf("Couch/GetDeviceTemplate make request: %w", err)
	}

	return convertDeviceTemplate(t), nil
}

// ListDeviceTemplates lists the ids of all the templates currently found in couch
func (s *Service) ListDeviceTemplates() ([]string, error) {
	// Make the request
	rows, err := s.client.DB(context.TODO(), _templatesDB).AllDocs(context.TODO())
	if err != nil {
		return []string{}, fmt.Errorf("couch/ListDeviceTemplates: make request: %w", err)
	}

	// Parse into a slice of strings
	templates := []string{}
	for rows.Next() {
		templates = append(templates, rows.ID())
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
