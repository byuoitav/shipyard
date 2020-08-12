package shipyard

import "errors"

// ErrNotFound is the error that a Datastore should return if it is unable to
// find the requested item
var ErrNotFound = errors.New("The requested item was not found")

// Datastore is the interface that a datastore implementation must
// meet in order to function properly for shipyard
type Datastore interface {
	GetRoom(roomID string) (Room, error)
	ListAllRooms() ([]string, error)
	SaveRoom(room Room) error

	GetDevice(deviceID string) (Device, error)
	GetRoomDevices(roomID string) ([]Device, error)
	ListRoomDevices(roomID string) ([]string, error)
	SaveDevice(device Device) error

	GetDeviceTemplate(templateID string) (DeviceTemplate, error)
	ListDeviceTemplates() ([]string, error)

	GetUIConfig(roomID string) (UIConfig, error)
	SaveUIConfig(config UIConfig) error

	SaveControlDoc(doc RoomControlDoc) error

	GetConfig(configID string) (interface{}, error)
}
