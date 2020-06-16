package shipyard

// Transport is the interface that any given transport implementation should
// meet for shipyard
type Transport interface {
	Serve(address string) error
}
