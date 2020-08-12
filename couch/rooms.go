package couch

import (
	"context"
	"fmt"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/go-kivik/kivik/v3"
)

// The path for the rooms database
const _roomsDB = "rooms"

// room is the couch representation of a room
type room struct {
	Rev                string            `json:"_rev,omitempty"`
	ID                 string            `json:"_id"`
	Designation        string            `json:"designation"`
	PublicDescription  string            `json:"publicDescription"`
	PrivateDescription string            `json:"privateDescription"`
	ProxyBaseURL       string            `json:"proxyBaseURL"`
	Tags               map[string]string `json:"tags"`
}

// GetRoom returns the room matching the requested ID
func (s *Service) GetRoom(roomID string) (shipyard.Room, error) {
	room := room{}
	err := s.client.DB(context.TODO(), _roomsDB).Get(context.TODO(), roomID).ScanDoc(&room)
	if err != nil {
		// Not found error
		if kivik.StatusCode(err) == http.StatusNotFound {
			return shipyard.Room{}, shipyard.ErrNotFound
		}

		err = fmt.Errorf("couch/GetRoom make request: %w", err)
		return shipyard.Room{}, err
	}

	r := shipyard.Room{
		ID:                 room.ID,
		Designation:        room.Designation,
		PublicDescription:  room.PublicDescription,
		PrivateDescription: room.PrivateDescription,
		ProxyBaseURL:       room.ProxyBaseURL,
		Tags:               room.Tags,
	}
	return r, nil
}

// ListAllRooms returns a list of all the rooms that exist
func (s *Service) ListAllRooms() ([]string, error) {
	rows, err := s.client.DB(context.TODO(), _roomsDB).AllDocs(context.TODO())
	if err != nil {
		err = fmt.Errorf("couch/ListAllRooms make request: %w", err)
		return []string{}, err
	}

	// Pull the list from the docs
	rooms := []string{}
	for rows.Next() {
		rooms = append(rooms, rows.ID())
	}

	return rooms, nil
}

// SaveRoom saves the given room to couch by either updating an existing entry
// or creating a new document in the database
func (s *Service) SaveRoom(r shipyard.Room) error {
	// Copy given room to couch version
	cRoom := room{
		ID:                 r.ID,
		Designation:        r.Designation,
		PublicDescription:  r.PublicDescription,
		PrivateDescription: r.PrivateDescription,
		ProxyBaseURL:       r.ProxyBaseURL,
		Tags:               r.Tags,
	}

	db := s.client.DB(context.TODO(), _roomsDB)

	// Check if the room exists
	exists := true
	eRoom := room{}
	err := db.Get(context.TODO(), r.ID).ScanDoc(&eRoom)
	if err != nil {
		// Room does not exist
		if kivik.StatusCode(err) == http.StatusNotFound {
			exists = false
		} else {
			return fmt.Errorf("couch/SaveRoom request to check: %w", err)
		}
	}

	// If the room already exists set the revision ID so we can update
	if exists {
		cRoom.Rev = eRoom.Rev
	}

	// Save the room
	_, err = db.Put(context.TODO(), cRoom.ID, cRoom)
	if err != nil {
		return fmt.Errorf("couch/SaveRoom put room: %w", err)
	}

	return nil
}
