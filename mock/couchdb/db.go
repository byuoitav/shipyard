package couchdb

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
)

type MockDB struct {
	expectedCalls           []call
	callsReceived           []*http.Request
	countRequests           int
	countUnexpectedRequests int
	countAuthFailures       int
	username                string
	password                string
	requestNum              int
	s                       *httptest.Server
}

type call struct {
	Method       string
	Path         string
	ResponseCode int
	Return       interface{}
}

func New() *MockDB {
	return &MockDB{}
}

func (m *MockDB) RequireAuth(username, password string) {
	m.username = username
	m.password = password
}

func (m *MockDB) Expect(method, path string, responseCode int, toReturn interface{}) {
	m.expectedCalls = append(m.expectedCalls, call{
		Method:       method,
		Path:         path,
		ResponseCode: responseCode,
		Return:       toReturn,
	})
}

func (m *MockDB) HadUnexpectedCalls() bool {
	return m.countUnexpectedRequests != 0
}

func (m *MockDB) AsExpected() bool {
	if m.countUnexpectedRequests == 0 &&
		len(m.expectedCalls) == m.countRequests &&
		m.countAuthFailures == 0 {
		return true
	}
	return false
}

func (m *MockDB) Close() {
	m.s.Close()
}

func (m *MockDB) Serve() string {
	s := httptest.NewServer(http.HandlerFunc(m.handler))
	m.s = s
	return m.s.URL
}

func (m *MockDB) handler(w http.ResponseWriter, r *http.Request) {
	expectedCall := m.expectedCalls[m.requestNum]
	m.requestNum += 1
	m.countRequests += 1

	// Check for auth
	if m.username != "" {
		u, p, ok := r.BasicAuth()
		if !ok {
			m.countAuthFailures += 1
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Expected Authentication"))
			return
		}

		if u != m.username || p != m.password {
			m.countAuthFailures += 1
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Bad Authentication"))
			return
		}
	}

	// Check for matching request
	if r.URL.Path != expectedCall.Path ||
		r.Method != expectedCall.Method {

		m.countUnexpectedRequests += 1

		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Unexpected Request"))
		return
	}

	body, _ := json.Marshal(expectedCall.Return)

	w.WriteHeader(expectedCall.ResponseCode)
	w.Write(body)
}
