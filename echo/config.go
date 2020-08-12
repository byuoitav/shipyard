package echo

import (
	"errors"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

// getConfig handles requests to `GET /config/:config_id`
func (s *Service) getConfig(c echo.Context) error {
	// Get the config
	conf, err := s.datastore.GetConfig(c.Param("config_id"))
	if err != nil {
		// Not found
		if errors.Is(err, shipyard.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "Requested resource was not found")
		}

		// Other errors
		s.logger.Errorf("echo/getConfig get config: %s")
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get Config")
	}

	return c.JSON(http.StatusOK, conf)
}
