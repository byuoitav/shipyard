package shipyard

// Room represents a physical room containing AV Equipment
type Room struct {
	ID                 string `json:"id"`
	Designation        string `json:"designation"`
	PublicDescription  string `json:"publicDescription"`
	PrivateDescription string `json:"privateDescription"`
	ProxyBaseURL       string `json:"proxyBaseURL"`
	Tags               Tags   `json:"tags"`
}
