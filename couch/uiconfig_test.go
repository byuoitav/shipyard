package couch

import (
	"errors"
	"net/http"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
	"github.com/go-kivik/kivikmock/v3"
	"github.com/matryer/is"
)

func TestGetUIConfig(t *testing.T) {
	is := is.New(t)

	validConfigDB := uiConfig{
		ID: "ITB-1010",
		ControlPanels: map[string]string{
			"ITB-1010-CP1": "group1",
			"ITB-1010-CP2": "group1",
		},
		ControlGroups: map[string]shipyard.ControlGroup{
			"group1": {
				Displays: []shipyard.DisplayControl{
					{Name: "ITB-1010-D1"},
				},
			},
		},
	}

	validConfig := shipyard.UIConfig{
		ID: "ITB-1010",
		ControlPanels: map[string]string{
			"ITB-1010-CP1": "group1",
			"ITB-1010-CP2": "group1",
		},
		ControlGroups: map[string]shipyard.ControlGroup{
			"group1": {
				Displays: []shipyard.DisplayControl{
					{Name: "ITB-1010-D1"},
				},
			},
		},
	}

	t.Run("Returns existing document when requested", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_uiConfigDB).WillReturn(db)
		db.ExpectGet().WithDocID("ITB-1010").WillReturn(
			kivikmock.DocumentT(t, validConfigDB),
		)

		s := Service{
			client: client,
		}

		c, err := s.GetUIConfig("ITB-1010")

		is.NoErr(err)            // Expected no errors
		is.Equal(c, validConfig) // Expected the output to match the document

	})

	t.Run("Returns shipyard.ErrNotFound when the document doesn't exist", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_uiConfigDB).WillReturn(db)
		db.ExpectGet().WithDocID("ITB-1111").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})

		s := Service{
			client: client,
		}

		c, err := s.GetUIConfig("ITB-1111")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get an ErrNotFound
		is.Equal(c, shipyard.UIConfig{})              // Expected an empty UI Config
	})
}
