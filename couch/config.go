package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

var _configDB = "shipyard"

func (s *Service) GetConfig(id string) (interface{}, error) {

	var i interface{}
	err := s.client.DB(context.TODO(), _configDB).Get(context.TODO(), id).ScanDoc(&i)
	if err != nil {
		// Not found error
		if kivik.StatusCode(err) == http.StatusNotFound {
			return nil, shipyard.ErrNotFound
		}

		return nil, fmt.Errorf("couch/GetConfig get config: %w", err)
	}

	return i, nil
}
