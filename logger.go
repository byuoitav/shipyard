package shipyard

// Logger is the interface that should be met by a logging implementation
// in order for it to be useful to shipyard
type Logger interface {
	Debugf(string, ...interface{})
	Infof(string, ...interface{})
	Warnf(string, ...interface{})
	Errorf(string, ...interface{})
}
