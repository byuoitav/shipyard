package echo

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

// getRoomDevices handles requests to `GET /rooms/:room_id/devices`
func (s *Service) getRoomDevices(c echo.Context) error {
	type response struct {
		RoomID  string            `json:"room_id"`
		Devices []shipyard.Device `json:"devices"`
	}

	// Get the devices
	devs, err := s.datastore.GetRoomDevices(c.Param("room_id"))
	if err != nil {
		s.logger.Errorf("echo/getRoomDevices get devices: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get room devices")
	}

	// Respond
	res := response{
		RoomID:  c.Param("room_id"),
		Devices: devs,
	}

	return c.JSON(http.StatusOK, res)
}

// getDevice handles requests to `GET /devices/:device_id`
func (s *Service) getDevice(c echo.Context) error {
	// Get the device
	d, err := s.datastore.GetDevice(c.Param("device_id"))
	if err != nil {
		if errors.Is(err, shipyard.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "Device not found")
		}

		s.logger.Errorf("echo/getDevice get device: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get device")
	}

	return c.JSON(http.StatusOK, d)
}

// saveDevice handles requests to `PUT /devices/:device_id`
func (s *Service) saveDevice(c echo.Context) error {
	type response struct {
		Success bool `json:"success"`
	}

	// Parse the request
	d := shipyard.Device{}
	err := c.Bind(&d)
	if err != nil {
		s.logger.Errorf("echo/saveDevice parse request: %s", err)
		return echo.NewHTTPError(http.StatusBadRequest, "Request is malformatted")
	}

	// Save the device
	err = s.datastore.SaveDevice(d)
	if err != nil {
		s.logger.Errorf("echo/saveDevice save device: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save device")
	}

	res := response{
		Success: true,
	}

	// Update control doc
	go func() {
		// Get Room ID from device
		parts := strings.Split(d.ID, "-")
		room := fmt.Sprintf("%s-%s", parts[0], parts[1])
		// Update
		s.UpdateControlDoc(room)
	}()

	return c.JSON(http.StatusOK, res)
}
