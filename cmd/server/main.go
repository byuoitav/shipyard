package main

import (
	"fmt"
	"log"

	"github.com/byuoitav/shipyard/control"
	"github.com/byuoitav/shipyard/couch"
	"github.com/byuoitav/shipyard/echo"
	"github.com/spf13/pflag"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	var (
		port        int
		opaURL      string
		opaToken    string
		disableAuth bool
		dbAddress   string
		dbUsername  string
		dbPassword  string
	)

	// Parameters
	pflag.IntVarP(&port, "port", "p", 80, "The port that the server should run on")
	pflag.StringVar(&opaURL, "opa-url", "", "The URL of the OPA Authorization server")
	pflag.StringVar(&opaToken, "opa-token", "", "The token to use for OPA")
	pflag.BoolVar(&disableAuth, "disable-auth", false, "Disable all auth z/n checks")
	pflag.StringVar(&dbAddress, "db-address", "", "The address to the couch DB")
	pflag.StringVar(&dbUsername, "db-username", "", "The username to the couch DB")
	pflag.StringVar(&dbPassword, "db-password", "", "The password to the couch DB")

	pflag.Parse()

	// Logger config
	logConfig := zap.Config{
		Level:       zap.NewAtomicLevelAt(zap.InfoLevel),
		Development: false,
		Sampling: &zap.SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding: "json",
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "@",
			LevelKey:       "level",
			NameKey:        "logger",
			CallerKey:      "caller",
			MessageKey:     "msg",
			StacktraceKey:  "stacktrace",
			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.StringDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
		OutputPaths:      []string{"stderr"},
		ErrorOutputPaths: []string{"stderr"},
	}

	l, err := logConfig.Build()
	if err != nil {
		log.Fatalf("failed to initialize zap logger: %v", err)
	}

	logger := l.Sugar()
	logger.Info("Zap logger started")
	_ = l.Sync()

	// Datastore
	ds, err := couch.New(dbAddress, dbUsername, dbPassword)
	if err != nil {
		log.Fatalf("Failed to create couchdb service: %s", err)
	}

	// HTTP Transport
	address := fmt.Sprintf(":%d", port)
	http := echo.New(ds, &control.Service{}, echo.WithAuth(opaURL, opaToken), echo.WithLogger(logger))
	err = http.Serve(address)
	if err != nil {
		log.Fatalf("Failed to start http transport: %s", err)
	}
}
