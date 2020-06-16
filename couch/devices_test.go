package couch

import (
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/byuoitav/shipyard/mock/couchdb"
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
		db := couchdb.New()
		db.Expect("GET", "/devices/foo", http.StatusNotFound, "Object not found")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		d, err := s.GetDevice("foo")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get ErrNotFound
		is.True(d.ID == "")                           // Expected device returned to be empty
		is.True(db.AsExpected())                      // Expected DB calls to be made
	})

	t.Run("Should return an error on other unexpected error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/devices/foo", http.StatusInternalServerError, "Uh-oh")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		d, err := s.GetDevice("foo")

		is.True(err != nil)      // Expected an error
		is.True(d.ID == "")      // Expected device returned to be empty
		is.True(db.AsExpected()) // Expected DB calls to be made

	})

	t.Run("Should return the device when it exists", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/devices/foobar", http.StatusOK, couchDev)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		d, err := s.GetDevice("foobar")

		is.NoErr(err)                             // Expected no errors
		is.True(reflect.DeepEqual(expected, d))   // Expected device returned to match expected
		fmt.Printf("%s\n", cmp.Diff(expected, d)) // Only prints if test fails
		is.True(db.AsExpected())                  // Expected DB calls to be made

	})
}

func TestGetRoomDevices(t *testing.T) {
	is := is.New(t)

	emptyResponse := deviceResponse{
		Docs: []device{},
	}

	goodResponse := deviceResponse{
		Docs: []device{
			{
				ID: "foo",
			},
			{
				ID: "bar",
			},
			{
				ID: "baz",
			},
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
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusInternalServerError, "Help!")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		devs, err := s.GetRoomDevices("foo")

		is.True(err != nil)      // Expected an error
		is.True(len(devs) == 0)  // Expected no devices back
		is.True(db.AsExpected()) // Expected DB calls to be made
	})

	t.Run("Should return empty list if there are no devices", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusOK, emptyResponse)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		devs, err := s.GetRoomDevices("foo")

		is.NoErr(err)            // Expected no errors
		is.True(len(devs) == 0)  // Expected no devices back
		is.True(db.AsExpected()) // Expected DB calls to be made
	})

	t.Run("Should return all devices that exist for a room", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusOK, goodResponse)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		devs, err := s.GetRoomDevices("foo")

		is.NoErr(err)                              // Expected no errors
		is.True(len(devs) == 3)                    // Expected to get back all devices
		is.True(reflect.DeepEqual(expected, devs)) // Expected response to match
		is.True(db.AsExpected())                   // Expected DB calls to be made
	})
}

func TestListRoomDevices(t *testing.T) {
	is := is.New(t)

	emptyResponse := deviceResponse{
		Docs: []device{},
	}

	goodResponse := deviceResponse{
		Docs: []device{
			{
				ID: "foo",
			},
			{
				ID: "bar",
			},
			{
				ID: "baz",
			},
		},
	}

	t.Run("Should return an error on unexpected couch error", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusInternalServerError, "Bye-bye")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		dList, err := s.ListRoomDevices("ITB-1010")

		is.True(err != nil)      // Expected to get an error
		is.True(len(dList) == 0) // Expected empty list
		is.True(db.AsExpected()) // Expected DB calls to be made
	})

	t.Run("Should return an empty list if there are no devices", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusOK, emptyResponse)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		dList, err := s.ListRoomDevices("ITB-1010")

		is.NoErr(err)            // Expected no errors
		is.True(len(dList) == 0) // Expected empty list
		is.True(db.AsExpected()) // Expected DB calls to be made
	})

	t.Run("Should return all devices that exist for a room", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("POST", "/devices/_find", http.StatusOK, goodResponse)
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
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
		is.True(db.AsExpected())                    // Expected DB calls to be made

	})
}
