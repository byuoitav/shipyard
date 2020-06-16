package couch

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/byuoitav/shipyard"
)

// The path for the rooms database
const _roomsPath = "rooms"

// room is the couch representation of a room
type room struct {
	Rev         string            `json:"_rev,omitempty"`
	ID          string            `json:"_id"`
	Designation string            `json:"designation"`
	Tags        map[string]string `json:"tags"`
}

// GetRoom returns the room matching the requested ID
func (s *Service) GetRoom(roomID string) (shipyard.Room, error) {
	path := fmt.Sprintf("%s/%s", _roomsPath, roomID)

	room := room{}
	err := s.makeRequest("GET", path, nil, &room)
	if err != nil {
		err = fmt.Errorf("couch/GetRoom make request: %w", err)
		return shipyard.Room{}, err
	}

	r := shipyard.Room{
		ID:          room.ID,
		Designation: room.Designation,
		Tags:        room.Tags,
	}
	return r, nil
}

// ListAllRooms returns a list of all the rooms that exist
func (s *Service) ListAllRooms() ([]string, error) {
	path := fmt.Sprintf("%s/_all_docs", _roomsPath)

	list := docList{}
	err := s.makeRequest("GET", path, nil, &list)
	if err != nil {
		err = fmt.Errorf("couch/ListAllRooms make request: %w", err)
		return []string{}, err
	}

	// Pull the list from the docs
	rooms := []string{}
	for _, doc := range list.Rows {
		rooms = append(rooms, doc.ID)
	}

	return rooms, nil
}

// SaveRoom saves the given room to couch by either updating an existing entry
// or creating a new document in the database
func (s *Service) SaveRoom(r shipyard.Room) error {
	// Copy given room to couch version
	cRoom := room{
		ID:          r.ID,
		Designation: r.Designation,
		Tags:        r.Tags,
	}

	// Check if the room exists
	path := fmt.Sprintf("%s/%s", _roomsPath, r.ID)

	exists := true
	eRoom := room{}
	err := s.makeRequest("GET", path, nil, &eRoom)
	if err != nil {
		// Room does not exist
		if errors.Is(err, shipyard.ErrNotFound) {
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
	body, err := json.Marshal(cRoom)
	if err != nil {
		return fmt.Errorf("couch/SaveRoom marshal room: %w", err)
	}

	res := putResponse{}
	err = s.makeRequest("PUT", path, body, &res)
	if err != nil {
		return fmt.Errorf("couch/SaveRoom put room: %w", err)
	}

	// Check for OK
	if !res.OK {
		return fmt.Errorf("couch/SaveRoom did not get ok back from couch")
	}

	return nil
}
