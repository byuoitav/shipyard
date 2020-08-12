package couch

import (
	"fmt"
	"net/url"

	_ "github.com/go-kivik/couchdb/v3"
	"github.com/go-kivik/kivik/v3"
)

type Service struct {
	client *kivik.Client
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

// New takes an address, username, and password for the desired couchdb
// and returns a new service backed by that datastore
func New(addr, user, pass string) (*Service, error) {

	url, err := url.Parse(addr)
	if err != nil {
		return nil, fmt.Errorf("Parsing address: %w", err)
	}

	dsn := fmt.Sprintf("%s://%s:%s@%s", url.Scheme, user, pass, url.Host)

	c, err := kivik.New("couch", dsn)
	if err != nil {
		return nil, fmt.Errorf("Creating client: %w", err)
	}

	return &Service{
		client: c,
	}, nil
}
