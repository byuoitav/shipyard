package echo

import (
	"fmt"

	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
)

type Service struct {
	disableAuth bool
	opaAddress  string
	opaToken    string
	datastore   shipyard.Datastore
	logger      shipyard.Logger
}

func New(ds shipyard.Datastore, opts ...Option) *Service {
	s := Service{
		datastore:   ds,
		disableAuth: true,
		logger:      &nullLogger{},
	}

	// Apply options
	for _, opt := range opts {
		opt(&s)
	}

	return &s
}

func (s *Service) Serve(address string) error {

	router := echo.New()
	authRouter := router.Group("")

	// Enable auth if it hasn't been disabled
	if !s.disableAuth {
		if s.opaAddress == "" {
			return fmt.Errorf("echo/Serve No OPA Address given")
		}

		authRouter.Use(s.authorize)
	}

	// Rooms
	authRouter.GET("/rooms", s.getRoomList)
	authRouter.GET("/rooms/:room_id", s.getRoom)
	authRouter.PUT("/rooms/:room_id", s.saveRoom)

	// Devices
	authRouter.GET("/rooms/:room_id/devices", s.getRoomDevices)
	authRouter.GET("/devices/:device_id", s.getDevice)
	authRouter.PUT("/devices/:device_id", s.saveDevice)

	// Device Templates
	authRouter.GET("/device_templates", s.listDeviceTemplates)
	authRouter.GET("/device_templates/:template_id", s.getDeviceTemplate)

	// UI Config
	authRouter.GET("/ui_config/:room_id", s.getUIConfig)
	authRouter.PUT("/ui_config/:room_id", s.saveUIConfig)

	err := router.Start(address)
	if err != nil {
		return fmt.Errorf("echo/Serve failed to start server: %w", err)
	}

	return nil
}
