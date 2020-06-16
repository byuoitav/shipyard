package couch

import (
	"errors"
	"net/http"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/byuoitav/shipyard/mock/couchdb"
	"github.com/matryer/is"
)

// Testing utilities
// These things expose internal functionality for external tests

type CouchRoom room

type CouchDocList struct {
	Rows []CouchDocDescription `json:"rows"`
}
type CouchDocDescription docDescription

type CouchDeviceTemplate struct {
	Template CouchDevice `json:"template"`
	deviceTemplate
}
type CouchDevice device

// Couch tests
func TestMakeRequest(t *testing.T) {
	is := is.New(t)

	t.Run("Returns Error for bad address", func(t *testing.T) {
		is := is.New(t)
		s := Service{
			Address:  "localhost:10000",
			Username: "foo",
			Password: "bar",
		}

		err := s.makeRequest("GET", "/", nil, nil)
		is.True(err != nil) // Expected to get an error
	})

	t.Run("Sends Authentication Correctly", func(t *testing.T) {
		is := is.New(t)

		db := couchdb.New()
		db.RequireAuth("foo", "bar")
		db.Expect("GET", "/", http.StatusOK, "Authentication Approved!")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address:  addr,
			Username: "foo",
			Password: "bar",
		}

		response := ""
		err := s.makeRequest("GET", "", nil, &response)

		is.NoErr(err)                                   // Expected to get back a successful response
		is.True(db.AsExpected())                        // Expected DB to get calls
		is.True(response == "Authentication Approved!") // Expected correct response
	})

	t.Run("Returns ErrNotFound for 404", func(t *testing.T) {
		is := is.New(t)

		// Setup mock db
		db := couchdb.New()
		db.Expect("GET", "/foo/bar", http.StatusNotFound, "Document Not found")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		err := s.makeRequest("GET", "foo/bar", nil, nil)

		is.True(errors.Is(err, shipyard.ErrNotFound)) // Expected to get back shipyard.ErrNotFound
		is.True(db.AsExpected())
	})

	t.Run("Successfully returns found document", func(t *testing.T) {
		is := is.New(t)

		// Setup mock db
		db := couchdb.New()
		db.Expect("GET", "/foo/bar", http.StatusOK, "You Found Me!")
		addr := db.Serve()
		defer db.Close()

		s := Service{
			Address: addr,
		}

		response := ""
		err := s.makeRequest("GET", "foo/bar", nil, &response)

		is.NoErr(err)                        // Did not expect any errors
		is.True(response == "You Found Me!") // Expected the document to be marshalled into response correctly
	})

}
