package echo

import (
	"errors"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

// getRoomList handles requests to `GET /rooms`
func (s *Service) getRoomList(c echo.Context) error {
	type response struct {
		Rooms []string `json:"rooms"`
	}

	rooms, err := s.datastore.ListAllRooms()
	if err != nil {
		s.logger.Errorf("echo/getRoomList list rooms: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to list rooms")
	}

	res := response{
		Rooms: rooms,
	}

	return c.JSON(http.StatusOK, res)
}

// getRoom handles requests to `GET /rooms/:room_id`
func (s *Service) getRoom(c echo.Context) error {
	// Get room
	r, err := s.datastore.GetRoom(c.Param("room_id"))
	if err != nil {
		// 404 if not found
		if errors.Is(err, shipyard.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "The requested resource was not found")
		}

		s.logger.Errorf("echo/getRoom get room: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve room")
	}

	return c.JSON(http.StatusOK, r)
}

// saveRoom handles request to `PUT /rooms/:room_id`
func (s *Service) saveRoom(c echo.Context) error {
	type response struct {
		Success bool `json:"success"`
	}

	// Parse the room
	r := shipyard.Room{}
	err := c.Bind(&r)
	if err != nil {
		s.logger.Errorf("echo/saveRoom parsing: %s", err)
		return echo.NewHTTPError(http.StatusBadRequest, "Request is malformatted")
	}

	// Save
	err = s.datastore.SaveRoom(r)
	if err != nil {
		s.logger.Errorf("echo/saveRoom saving room: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save room")
	}

	res := response{
		Success: true,
	}

	return c.JSON(http.StatusOK, res)
}
