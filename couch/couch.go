package couch

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/byuoitav/shipyard"
)

type Service struct {
	Address  string
	Username string
	Password string
}

// docList represents a request to couch for `_all_docs` on a database
type docList struct {
	Rows []docDescription `json:"rows"`
}

// docDescription represents the rows returned from `_all_docs`
type docDescription struct {
	ID string `json:"id"`
}

// putResponse represents the response returned after a put on a document
type putResponse struct {
	ID  string `json:"id"`
	OK  bool   `json:"ok"`
	Rev string `json:"rev"`
}

// query represents a query body to be sent to couch
type query struct {
	Selector map[string]interface{} `json:"selector"`
	Limit    int                    `json:"limit"`
}

// search represents a search parameter in a couch _find call
type search struct {
	GT    string `json:"$gt,omitempty"`
	LT    string `json:"$lt,omitempty"`
	Regex string `json:"$regex,omitempty"`
}

// makeRequest makes the given request to couch and then parses the response
// into the responseBody pointer passed in
func (s *Service) makeRequest(method, path string, body []byte, responseBody interface{}) error {
	url := fmt.Sprintf("%s/%s", s.Address, path)

	// Create the request
	req, err := http.NewRequest(method, url, bytes.NewReader(body))
	if err != nil {
		err = fmt.Errorf("db/makeRequest create couch request: %w", err)
		return err
	}

	// Add basic auth
	req.SetBasicAuth(s.Username, s.Password)

	req.Header.Add("content-type", "application/json")

	// Execute the request
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		err = fmt.Errorf("db/makeRequest make request: %w", err)
		return err
	}
	defer res.Body.Close()

	// Check for 404
	if res.StatusCode == http.StatusNotFound {
		return shipyard.ErrNotFound
	}

	// Check for non 200
	if res.StatusCode < 200 || res.StatusCode > 299 {
		return fmt.Errorf("db/makeRequest Error response from couch. Code: %d", res.StatusCode)
	}

	// Read the body
	b, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return fmt.Errorf("db/makeRequest reading response body: %w", err)
	}

	// Unmarshal
	err = json.Unmarshal(b, responseBody)
	if err != nil {
		return fmt.Errorf("db/makeRequest json unmarshal: %w", err)
	}

	return err
}
