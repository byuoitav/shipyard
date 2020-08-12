package echo

// UpdateControlDoc updates the control doc for the given room
func (s *Service) UpdateControlDoc(roomID string) {

	room, err := s.datastore.GetRoom(roomID)
	if err != nil {
		s.logger.Errorf("echo/UpdateControlDoc get room (%s): %s", roomID, err)
		return
	}

	devs, err := s.datastore.GetRoomDevices(roomID)
	if err != nil {
		s.logger.Errorf("echo/UpdateControlDoc get devices (%s): %s", roomID, err)
		return
	}

	controlDoc, err := s.controlDocCompiler.CompileRoomControlDoc(room, devs)
	if err != nil {
		s.logger.Errorf("echo/UpdateControlDoc compile control doc (%s): %s", roomID, err)
	}

	err = s.datastore.SaveControlDoc(controlDoc)
	if err != nil {
		s.logger.Errorf("echo/UpdateControlDoc save control doc (%s): %s", roomID, err)
	}

}
