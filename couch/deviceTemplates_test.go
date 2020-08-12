package couch

import (
	"errors"
	"net/http"
	"reflect"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
	"github.com/go-kivik/kivik/v3/driver"
	"github.com/go-kivik/kivikmock/v3"
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
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_templatesDB).WillReturn(db)
		db.ExpectGet().WithDocID("foo").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})

		s := Service{
			client: client,
		}

		temp, err := s.GetDeviceTemplate("foo")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get ErrNotFound
		is.True(temp.ID == "")                        // Expected template returned to be empty
	})

	t.Run("Should return template for found docs", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_templatesDB).WillReturn(db)
		db.ExpectGet().WithDocID("foo").WillReturn(kivikmock.DocumentT(
			t,
			dt,
		))

		s := Service{
			client: client,
		}

		temp, err := s.GetDeviceTemplate("foo")

		is.NoErr(err)                              // Expected no errors
		is.True(reflect.DeepEqual(temp, expected)) // Expected template to match expected
	})
}

func TestListDeviceTemplates(t *testing.T) {
	is := is.New(t)

	expected := []string{
		"foo",
		"bar",
		"baz",
		"foobar",
	}

	t.Run("Should return error on unexpected couch error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_templatesDB).WillReturn(db)
		db.ExpectAllDocs().WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		tlist, err := s.ListDeviceTemplates()

		is.True(err != nil)      // Expected to get an error
		is.True(len(tlist) == 0) // Expected empty list
	})

	t.Run("Should return list of templates on success", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_templatesDB).WillReturn(db)
		rows := kivikmock.NewRows()
		for _, id := range expected {
			rows.AddRow(&driver.Row{
				ID: id,
			})
		}
		db.ExpectAllDocs().WillReturn(rows)

		s := Service{
			client: client,
		}

		tlist, err := s.ListDeviceTemplates()

		is.NoErr(err)                               // Expected no errors
		is.True(len(tlist) == 4)                    // Expected all templates to be returned
		is.True(reflect.DeepEqual(expected, tlist)) // Expected list to match expected
	})
}
