package echo

import (
	"errors"
	"net/http"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

// listDeviceTemplates handles requests to `GET /device_templates`
func (s *Service) listDeviceTemplates(c echo.Context) error {
	type response struct {
		Templates []string `json:"templates"`
	}

	// Get the list
	temps, err := s.datastore.ListDeviceTemplates()
	if err != nil {
		s.logger.Errorf("echo/listDeviceTemplates get list: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to list device templates")
	}

	res := response{
		Templates: temps,
	}

	return c.JSON(http.StatusOK, res)
}

// getDeviceTemplate handles requests to `GET /device_templates/:template_id`
func (s *Service) getDeviceTemplate(c echo.Context) error {

	// Get the template
	t, err := s.datastore.GetDeviceTemplate(c.Param("template_id"))
	if err != nil {
		if errors.Is(err, shipyard.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound, "Requested template id was not found")
		}

		s.logger.Errorf("echo/getDeviceTemplate get template: %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get device template")
	}

	return c.JSON(http.StatusOK, t)
}
