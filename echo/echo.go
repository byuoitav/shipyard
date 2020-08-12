package echo

import (
	"fmt"

	"github.com/byuoitav/auth/wso2"
	"github.com/byuoitav/shipyard"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Service struct {
	disableAuth        bool
	opaAddress         string
	opaToken           string
	wso2CallbackURL    string
	wso2ClientID       string
	wso2ClientSecret   string
	wso2GatewayURL     string
	datastore          shipyard.Datastore
	logger             shipyard.Logger
	controlDocCompiler shipyard.RoomControlCompiler
}

func New(ds shipyard.Datastore, comp shipyard.RoomControlCompiler, opts ...Option) *Service {
	s := Service{
		datastore:          ds,
		disableAuth:        true,
		logger:             &nullLogger{},
		controlDocCompiler: comp,
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
	uiRouter := router.Group("")

	// Enable auth if it hasn't been disabled
	if !s.disableAuth {
		if s.opaAddress == "" {
			return fmt.Errorf("echo/Serve No OPA Address given")
		}

		client := wso2.Client{
			CallbackURL:  s.wso2CallbackURL,
			ClientID:     s.wso2ClientID,
			ClientSecret: s.wso2ClientSecret,
			GatewayURL:   s.wso2GatewayURL,
		}

		authRouter.Use(
			echo.WrapMiddleware(client.AuthCodeMiddleware),
			s.authorize,
		)
		uiRouter.Use(
			echo.WrapMiddleware(client.AuthCodeMiddleware),
			s.authorize,
		)
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

	// Config
	authRouter.GET("/config/:config_id", s.getConfig)

	// UI
	uiRouter.Use(
		middleware.StaticWithConfig(middleware.StaticConfig{
			Root:   "ui",
			Index:  "index.html",
			HTML5:  true,
			Browse: true,
		}),
	)

	err := router.Start(address)
	if err != nil {
		return fmt.Errorf("echo/Serve failed to start server: %w", err)
	}

	return nil
}
