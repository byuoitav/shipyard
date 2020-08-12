package echo

import "github.com/byuoitav/shipyard"

type Option func(*Service)

func WithLogger(l shipyard.Logger) Option {
	return func(s *Service) {
		s.logger = l
	}
}

// WithAuth turns on the auth for the service and points
// it at the given OPA server with the given token
func WithAuth(address, token, wso2CallbackURL, clientID, clientSecret, gatewayURL string) Option {
	return func(s *Service) {
		s.disableAuth = false
		s.opaAddress = address
		s.opaToken = token
		s.wso2CallbackURL = wso2CallbackURL
		s.wso2ClientID = clientID
		s.wso2ClientSecret = clientSecret
		s.wso2GatewayURL = gatewayURL
	}
}
