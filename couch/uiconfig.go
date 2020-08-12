package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

const _uiConfigDB = "ui-configs"

// The couch representation of a UI Config
type uiConfig struct {
	ID            string                           `json:"_id"`
	Rev           string                           `json:"_rev,omitempty"`
	ControlPanels map[string]string                `json:"controlPanels"`
	ControlGroups map[string]shipyard.ControlGroup `json:"controlGroups"`
}

func (s *Service) GetUIConfig(roomID string) (shipyard.UIConfig, error) {

	config := uiConfig{}
	err := s.client.DB(context.TODO(), _uiConfigDB).Get(context.TODO(), roomID).ScanDoc(&config)
	if err != nil {
		// Not found error
		if kivik.StatusCode(err) == http.StatusNotFound {
			return shipyard.UIConfig{}, shipyard.ErrNotFound
		}

		err = fmt.Errorf("couch/GetUIConfig make request: %w", err)
		return shipyard.UIConfig{}, err
	}

	c := shipyard.UIConfig{
		ID:            config.ID,
		ControlPanels: config.ControlPanels,
		ControlGroups: config.ControlGroups,
	}
	return c, nil

}

func (s *Service) SaveUIConfig(config shipyard.UIConfig) error {
	// Copy UIConfig to couch version
	cConfig := uiConfig{
		ID:            config.ID,
		ControlPanels: config.ControlPanels,
		ControlGroups: config.ControlGroups,
	}

	db := s.client.DB(context.TODO(), _uiConfigDB)

	// Check if the UI Config exists
	exists := true
	existsConfig := uiConfig{}
	err := db.Get(context.TODO(), config.ID).ScanDoc(&existsConfig)
	if err != nil {
		// Config does not exist
		if kivik.StatusCode(err) == http.StatusNotFound {
			exists = false
		} else {
			return fmt.Errorf("couch/SaveUIConfig request to check: %w", err)
		}
	}

	// If the config already exists set the revision ID so we can update
	if exists {
		cConfig.Rev = existsConfig.Rev
	}

	// Save the config
	_, err = db.Put(context.TODO(), cConfig.ID, cConfig)
	if err != nil {
		return fmt.Errorf("couch/SaveUIConfig put config: %w", err)
	}

	return nil
}
