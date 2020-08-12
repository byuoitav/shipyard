package couch

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
	"github.com/go-kivik/kivik/v3/driver"
	"github.com/go-kivik/kivikmock/v3"
	"github.com/google/go-cmp/cmp"
	"github.com/matryer/is"
)

func TestGetDevice(t *testing.T) {
	is := is.New(t)

	couchDev := device{
		Rev:     "1234",
		ID:      "foobar",
		Address: "here",
	}

	expected := shipyard.Device{
		ID:      "foobar",
		Address: "here",
		Ports:   []shipyard.DevicePort{},
	}

	t.Run("Should return shipyard.ErrNotFound if doc doesn't exist", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectGet().WithDocID("foo").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})

		s := Service{
			client: client,
		}

		d, err := s.GetDevice("foo")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get ErrNotFound
		is.True(d.ID == "")                           // Expected device returned to be empty
	})

	t.Run("Should return an error on other unexpected error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectGet().WithDocID("foo").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		d, err := s.GetDevice("foo")

		is.True(err != nil) // Expected an error
		is.True(d.ID == "") // Expected device returned to be empty

	})

	t.Run("Should return the device when it exists", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectGet().WithDocID("foobar").WillReturn(kivikmock.DocumentT(
			t,
			couchDev,
		))

		s := Service{
			client: client,
		}

		d, err := s.GetDevice("foobar")

		is.NoErr(err)                             // Expected no errors
		is.True(reflect.DeepEqual(expected, d))   // Expected device returned to match expected
		fmt.Printf("%s\n", cmp.Diff(expected, d)) // Only prints if test fails

	})
}

func TestGetRoomDevices(t *testing.T) {
	is := is.New(t)

	goodResponse := []device{
		{
			ID: "foo",
		},
		{
			ID: "bar",
		},
		{
			ID: "baz",
		},
	}

	expected := []shipyard.Device{
		{
			ID:    "foo",
			Ports: []shipyard.DevicePort{},
		},
		{
			ID:    "bar",
			Ports: []shipyard.DevicePort{},
		},
		{
			ID:    "baz",
			Ports: []shipyard.DevicePort{},
		},
	}

	t.Run("Should return an error on unexpected error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectFind().WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		devs, err := s.GetRoomDevices("foo")

		is.True(err != nil)     // Expected an error
		is.True(len(devs) == 0) // Expected no devices back
	})

	t.Run("Should return empty list if there are no devices", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectFind().WillReturn(kivikmock.NewRows())

		s := Service{
			client: client,
		}

		devs, err := s.GetRoomDevices("foo")

		is.NoErr(err)           // Expected no errors
		is.True(len(devs) == 0) // Expected no devices back
	})

	t.Run("Should return all devices that exist for a room", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		rows := kivikmock.NewRows()
		for _, r := range goodResponse {
			d, _ := json.Marshal(r)
			rows.AddRow(&driver.Row{
				ID:  r.ID,
				Doc: d,
			})
		}
		db.ExpectFind().WillReturn(rows)

		s := Service{
			client: client,
		}

		devs, err := s.GetRoomDevices("foo")

		is.NoErr(err)                              // Expected no errors
		is.True(len(devs) == 3)                    // Expected to get back all devices
		is.True(reflect.DeepEqual(expected, devs)) // Expected response to match
	})
}

func TestListRoomDevices(t *testing.T) {
	is := is.New(t)

	goodResponse := []device{
		{
			ID: "foo",
		},
		{
			ID: "bar",
		},
		{
			ID: "baz",
		},
	}

	t.Run("Should return an error on unexpected couch error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectFind().WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		dList, err := s.ListRoomDevices("ITB-1010")

		is.True(err != nil)      // Expected to get an error
		is.True(len(dList) == 0) // Expected empty list
	})

	t.Run("Should return an empty list if there are no devices", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		db.ExpectFind().WillReturn(kivikmock.NewRows())

		s := Service{
			client: client,
		}

		dList, err := s.ListRoomDevices("ITB-1010")

		is.NoErr(err)            // Expected no errors
		is.True(len(dList) == 0) // Expected empty list
	})

	t.Run("Should return all devices that exist for a room", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_devicesDB).WillReturn(db)
		rows := kivikmock.NewRows()
		for _, r := range goodResponse {
			d, _ := json.Marshal(r)
			rows.AddRow(&driver.Row{
				ID:  r.ID,
				Doc: d,
			})
		}
		db.ExpectFind().WillReturn(rows)

		s := Service{
			client: client,
		}

		expected := []string{
			"foo",
			"bar",
			"baz",
		}

		dList, err := s.ListRoomDevices("ITB-1010")

		is.NoErr(err)                               // Expected no errors
		is.True(len(dList) == 3)                    // Expected empty list
		is.True(reflect.DeepEqual(expected, dList)) // Expected list to match expected list

	})
}
