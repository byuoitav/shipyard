package echo

import (
	"errors"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

// getUIConfig handles requests to `GET /ui_config/:room_id`
func (s *Service) getUIConfig(c echo.Context) error {
	// Get the config
	conf, err := s.datastore.GetUIConfig(c.Param("room_id"))
	if err != nil {
		// Not found
		if errors.Is(err, shipyard.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "Requested resource was not found")
		}

		// Other errors
		s.logger.Errorf("echo/getUIConfig get config: %s")
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get UI Config")
	}

	return c.JSON(http.StatusOK, conf)
}

// saveUIConfig handles requests to `PUT /ui_config/:room_id`
func (s *Service) saveUIConfig(c echo.Context) error {
	type response struct {
		Success bool `json:"success"`
	}

	// Parse the request
	conf := shipyard.UIConfig{}
	err := c.Bind(&conf)
	if err != nil {
		s.logger.Errorf("echo/saveUIConfig parse request: %s")
		return echo.NewHTTPError(http.StatusBadRequest, "Request is malformatted")
	}

	// Save the UI Config
	err = s.datastore.SaveUIConfig(conf)
	if err != nil {
		s.logger.Errorf("echo/saveUIConfig save config: %s")
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save UI Config")
	}

	res := response{
		Success: true,
	}

	return c.JSON(http.StatusOK, res)
}
