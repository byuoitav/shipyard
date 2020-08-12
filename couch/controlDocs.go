package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

const _controlDocsDB = "control-docs"

// roomControlDoc is the couch representation of the control doc
type roomControlDoc struct {
	ID           string                            `json:"_id"`
	Rev          string                            `json:"_rev,omitempty"`
	ProxyBaseURL string                            `json:"proxyBaseURL"`
	Devices      map[string]shipyard.DeviceControl `json:"devices"`
}

func (s *Service) SaveControlDoc(doc shipyard.RoomControlDoc) error {

	// Create couch representation
	cDoc := roomControlDoc{
		ID:           doc.ID,
		ProxyBaseURL: doc.ProxyBaseURL,
		Devices:      doc.Devices,
	}

	db := s.client.DB(context.TODO(), _controlDocsDB)

	// Check if the controlDoc exists
	existingDoc := roomControlDoc{}
	err := db.Get(context.TODO(), doc.ID).ScanDoc(&existingDoc)
	// If there is any err other than Not Found
	if err != nil && kivik.StatusCode(err) != http.StatusNotFound {
		return fmt.Errorf("couch/SaveControlDoc check for existing doc: %w", err)
	}

	// Set the revision to match the (possibly) existing doc
	// This works if no doc is found as it will be zero value
	cDoc.Rev = existingDoc.Rev

	// Save the doc
	_, err = db.Put(context.TODO(), doc.ID, cDoc)
	if err != nil {
		return fmt.Errorf("couch/SaveControlDoc saving doc: %w", err)
	}

	return nil
}
