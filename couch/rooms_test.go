package couch_test

import (
	"errors"
	"net/http"
	"reflect"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/byuoitav/shipyard/couch"
	"github.com/byuoitav/shipyard/mock/couchdb"
	"github.com/matryer/is"
)

func TestGetRoom(t *testing.T) {
	is := is.New(t)

	itb1010 := shipyard.Room{
		ID:          "ITB-1010",
		Designation: "production",
		Tags: map[string]string{
			"Description": "ITB Conference Room",
		},
	}

	couchITB1010 := couch.CouchRoom{
		Rev:         "1234",
		ID:          "ITB-1010",
		Designation: "production",
		Tags: map[string]string{
			"Description": "ITB Conference Room",
		},
	}

	t.Run("Returns shipyard.ErrNotFound for non-existent doc", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/rooms/ITB-1111", http.StatusNotFound, "Object not found")
		addr := db.Serve()
		defer db.Close()

		s := couch.Service{
			Address: addr,
		}

		r, err := s.GetRoom("ITB-1111")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected ErrNotFound
		is.True(r.ID == "")                           // Expected room to be empty
		is.True(db.AsExpected())                      // Expected calls to be made to the DB
	})

	t.Run("Returns room that exists", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/rooms/ITB-1010", http.StatusOK, couchITB1010)
		addr := db.Serve()
		defer db.Close()

		s := couch.Service{
			Address: addr,
		}

		r, err := s.GetRoom("ITB-1010")

		is.NoErr(err)                          // Expected no errors
		is.True(reflect.DeepEqual(r, itb1010)) // Expected room to equal ITB-1010 struct
		is.True(db.AsExpected())               // Expected calls to be made to the DB
	})
}

func TestListAllRooms(t *testing.T) {
	is := is.New(t)

	listResponse := couch.CouchDocList{
		Rows: []couch.CouchDocDescription{
			{
				ID: "ITB-1010",
			},
			{
				ID: "ITB-1004",
			},
			{
				ID: "ITB-1006",
			},
		},
	}

	t.Run("Returns error on unexpected error from couch", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/rooms/_all_docs", http.StatusInternalServerError, "")
		addr := db.Serve()
		defer db.Close()

		s := couch.Service{
			Address: addr,
		}

		r, err := s.ListAllRooms()

		is.True(err != nil)      // Expected to get an error
		is.True(len(r) == 0)     // Expected an empty array
		is.True(db.AsExpected()) // Expected all db calls to be made
	})

	t.Run("Returns rooms on successful call", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		db := couchdb.New()
		db.Expect("GET", "/rooms/_all_docs", http.StatusOK, listResponse)
		addr := db.Serve()
		defer db.Close()

		s := couch.Service{
			Address: addr,
		}

		r, err := s.ListAllRooms()

		is.NoErr(err)            // Expected no errors
		is.True(len(r) == 3)     // Expected to get back all rooms
		is.True(db.AsExpected()) // Expected database calls to be made
	})
}
