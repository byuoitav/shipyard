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

func TestGetConfig(t *testing.T) {
	is := is.New(t)

	doc := `{"_id":"test"}`
	t.Run("Should return err not found if config doesn't exist", func(t *testing.T) {
		is := is.New(t)

		// Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_configDB).WillReturn(db)
		db.ExpectGet().WithDocID("foo").WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})

		s := Service{
			client: client,
		}

		_, err = s.GetConfig("foo")

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected ErrNotFound
	})

	t.Run("Should return the config file if exists", func(t *testing.T) {
		is := is.New(t)

		// Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_configDB).WillReturn(db)
		db.ExpectGet().WithDocID("foobar").WillReturn(
			kivikmock.DocumentT(t, doc),
		)

		s := Service{
			client: client,
		}

		_, err = s.GetConfig("foobar")

		is.NoErr(err) // Expected no error
	})
}
