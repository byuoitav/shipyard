package couch

import (
	"errors"
	"net/http"
	"reflect"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/byuoitav/shipyard/mock/couchdb"
	"github.com/matryer/is"
)

func TestGetDeviceTemplate(t *testing.T) {
	is := is.New(t)

	dt := deviceTemplate{
		ID: "foo",
		Template: device{
			ID: "{BLDG}-{ROOM}-foo",
		},
	}

	expected := shipyard.DeviceTemplate{
		ID: "foo",
		Template: shipyard.Device{
			ID:    "{BLDG}-{ROOM}-foo",
			Ports: []shipyard.DevicePort{},
		},
	}

	t.Run("Should return shipyard.ErrNotFound for non-existant docs", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/device-templates/foo", http.StatusNotFound, "Object not found")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		temp, err := s.GetDeviceTemplate("foo")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get ErrNotFound
		is.True(temp.ID == "")                        // Expected template returned to be empty
		is.True(db.AsExpected())                      // Expected DB calls to be made
	})

	t.Run("Should return template for found docs", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/device-templates/foo", http.StatusOK, dt)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		temp, err := s.GetDeviceTemplate("foo")

		is.NoErr(err)                              // Expected no errors
		is.True(reflect.DeepEqual(temp, expected)) // Expected template to match expected
		is.True(db.AsExpected())                   // Expected DB calls to be made
	})
}

func TestListDeviceTemplates(t *testing.T) {
	is := is.New(t)

	list := docList{
		Rows: []docDescription{
			{
				ID: "foo",
			},
			{
				ID: "bar",
			},
			{
				ID: "baz",
			},
			{
				ID: "foobar",
			},
		},
	}

	expected := []string{
		"foo",
		"bar",
		"baz",
		"foobar",
	}

	t.Run("Should return error on unexpected couch error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/device-templates/_all_docs", http.StatusInternalServerError, "whoops")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		tlist, err := s.ListDeviceTemplates()

		is.True(err != nil)      // Expected to get an error
		is.True(len(tlist) == 0) // Expected empty list
		is.True(db.AsExpected()) // Expected DB calls to be made
	})

	t.Run("Should return list of templates on success", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/device-templates/_all_docs", http.StatusOK, list)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		tlist, err := s.ListDeviceTemplates()

		is.NoErr(err)                               // Expected no errors
		is.True(len(tlist) == 4)                    // Expected all templates to be returned
		is.True(reflect.DeepEqual(expected, tlist)) // Expected list to match expected
		is.True(db.AsExpected())                    // Expected DB calls to be made
	})
}
