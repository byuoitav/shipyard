package echo

// nullLogger is the default logger for the echo http transport. It will not
// print out anything in any situation. It is a placeholder to prevent errors
// and null checking when a logger is not set
type nullLogger struct{}

func (l *nullLogger) Debugf(format string, a ...interface{}) {}
func (l *nullLogger) Infof(format string, a ...interface{})  {}
func (l *nullLogger) Warnf(format string, a ...interface{})  {}
func (l *nullLogger) Errorf(format string, a ...interface{}) {}
