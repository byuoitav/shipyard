package couch

import (
	"net/http"
	"testing"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
	"github.com/go-kivik/kivikmock/v3"
	"github.com/matryer/is"
)

func TestSaveControlDoc(t *testing.T) {
	is := is.New(t)

	controlDoc := shipyard.RoomControlDoc{
		ID:           "ITB-1010",
		ProxyBaseURL: "https://ITB-1010-CP1",
		Devices: map[string]shipyard.DeviceControl{
			"ITB-1010-D1": {
				Driver:  "test",
				Address: "http://ITB-1010-D1:1234",
			},
		},
	}

	controlDocDB := roomControlDoc{
		ID:           controlDoc.ID,
		ProxyBaseURL: controlDoc.ProxyBaseURL,
		Devices:      controlDoc.Devices,
	}

	controlDocUpdate := roomControlDoc{
		ID:           controlDoc.ID,
		Rev:          "1234",
		ProxyBaseURL: controlDoc.ProxyBaseURL,
		Devices:      controlDoc.Devices,
	}

	existingDoc := roomControlDoc{
		ID:           controlDoc.ID,
		Rev:          "1234",
		ProxyBaseURL: controlDoc.ProxyBaseURL,
		Devices:      controlDoc.Devices,
	}

	t.Run("Should save new control doc", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_controlDocsDB).WillReturn(db)
		db.ExpectGet().WithDocID(controlDoc.ID).WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})
		db.ExpectPut().WithDocID(controlDoc.ID).WithDoc(controlDocDB)

		s := Service{
			client: client,
		}

		err = s.SaveControlDoc(controlDoc)

		is.NoErr(err)                        // Expected no errors
		is.NoErr(mock.ExpectationsWereMet()) // Expected the database expectations to be met
	})

	t.Run("Should update an existing doc", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_controlDocsDB).WillReturn(db)
		db.ExpectGet().WithDocID(controlDoc.ID).WillReturn(
			kivikmock.DocumentT(t, existingDoc),
		)
		db.ExpectPut().WithDocID(controlDoc.ID).WithDoc(controlDocUpdate)

		s := Service{
			client: client,
		}

		err = s.SaveControlDoc(controlDoc)

		is.NoErr(err)                        // Expected no errors
		is.NoErr(mock.ExpectationsWereMet()) // Expected the database expectations to be met
	})

	t.Run("Should error if it can't check for existing doc", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_controlDocsDB).WillReturn(db)
		db.ExpectGet().WithDocID(controlDoc.ID).WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusInternalServerError,
		})

		s := Service{
			client: client,
		}

		err = s.SaveControlDoc(controlDoc)

		is.True(err != nil)                  // Expected an error
		is.NoErr(mock.ExpectationsWereMet()) // Expected the database expectations to be met
	})

	t.Run("Should error if there is an error while saving the doc", func(t *testing.T) {
		is := is.New(t)

		// Setup Mock DB
		client, mock, err := kivikmock.New()
		if err != nil {
			panic(err)
		}

		db := mock.NewDB()
		mock.ExpectDB().WithName(_controlDocsDB).WillReturn(db)
		db.ExpectGet().WithDocID(controlDoc.ID).WillReturnError(&kivik.Error{
			HTTPStatus: http.StatusNotFound,
		})
		db.ExpectPut().WithDocID(controlDoc.ID).WithDoc(controlDocDB).
			WillReturnError(&kivik.Error{
				HTTPStatus: http.StatusInternalServerError,
			})

		s := Service{
			client: client,
		}

		err = s.SaveControlDoc(controlDoc)

		is.True(err != nil)                  // Expected an error
		is.NoErr(mock.ExpectationsWereMet()) // Expected the database expectations to be met
	})
}
