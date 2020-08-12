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

func TestGetRoom(t *testing.T) {
	is := is.New(t)

	itb1010 := shipyard.Room{
		ID:          "ITB-1010",
		Designation: "production",
		Tags: map[string]string{
			"Description": "ITB Conference Room",
		},
	}

	couchITB1010 := room{
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
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_roomsDB).WillReturn(db)
		db.ExpectGet().WithDocID("ITB-1111").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})

		s := Service{
			client: client,
		}

		r, err := s.GetRoom("ITB-1111")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected ErrNotFound
		is.True(r.ID == "")                           // Expected room to be empty
	})

	t.Run("Returns room that exists", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_roomsDB).WillReturn(db)
		db.ExpectGet().WithDocID("ITB-1010").WillReturn(
			kivikmock.DocumentT(t, couchITB1010),
		)

		s := Service{
			client: client,
		}

		r, err := s.GetRoom("ITB-1010")

		is.NoErr(err)                          // Expected no errors
		is.True(reflect.DeepEqual(r, itb1010)) // Expected room to equal ITB-1010 struct
	})
}

func TestListAllRooms(t *testing.T) {
	is := is.New(t)

	listRooms := []string{
		"ITB-1010",
		"ITB-1004",
		"ITB-1006",
	}

	t.Run("Returns error on unexpected error from couch", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_roomsDB).WillReturn(db)
		db.ExpectAllDocs().WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		r, err := s.ListAllRooms()

		is.True(err != nil)  // Expected to get an error
		is.True(len(r) == 0) // Expected an empty array
	})

	t.Run("Returns rooms on successful call", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_roomsDB).WillReturn(db)
		rows := kivikmock.NewRows()
		for _, id := range listRooms {
			rows.AddRow(&driver.Row{
				ID: id,
			})
		}
		db.ExpectAllDocs().WillReturn(rows)

		s := Service{
			client: client,
		}

		r, err := s.ListAllRooms()

		is.NoErr(err)        // Expected no errors
		is.True(len(r) == 3) // Expected to get back all rooms
	})
}
