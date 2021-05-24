--
--
-- Shipyard
--
--

--
-- Create shipyard schema
--
CREATE SCHEMA shipyard AUTHORIZATION shipyard;

-- Switch to shipyard schema
SET search_path TO shipyard;
SET role shipyard;

--
-- Create Types
--
CREATE TYPE funding_type AS ENUM ('ITI', 'Departmental');
CREATE TYPE av_port_direction AS ENUM ('Incoming', 'Outgoing', 'Bi-Directional');
CREATE TYPE av_port_type AS ENUM ('Audio', 'Video', 'Audio/Video');
CREATE TYPE av_system_designation AS ENUM ('production', 'stage', 'development', 'testing');
CREATE TYPE control_panel_ui_type AS ENUM ('blueberry', 'cherry', 'dragonfruit');

--
-- Create Tables
--

-- Rooms
CREATE TABLE campuses (
	campus_abbreviation text PRIMARY KEY,
	campus_name text
);

CREATE TABLE buildings (
	building_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	building_name text,
	building_abbreviation text,
	campus_abbreviation text REFERENCES campuses (campus_abbreviation) ON DELETE CASCADE
);

CREATE TABLE room_types (
	room_type text PRIMARY KEY,
	description text
);

CREATE TABLE rooms (
	room_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	building_id integer REFERENCES buildings (building_id) ON DELETE CASCADE,
	room_number text,
	room_type text REFERENCES room_types (room_type) ON DELETE RESTRICT,
	published_description text,
	notes text
);

CREATE TABLE room_photos (
	room_photo_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	room_id integer REFERENCES rooms (room_id) ON DELETE CASCADE,
	url text,
	owned_by_shipyard boolean
);

CREATE TABLE room_tags (
	room_id integer REFERENCES rooms (room_id) ON DELETE CASCADE,
	tag_key text,
	tag_value text,
	PRIMARY KEY(room_id, tag_key)
);

-- Device Models
CREATE TABLE device_drivers (
	driver_name text PRIMARY KEY,
	description text
);

CREATE TABLE device_models (
	model_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	manufacturer text,
	model_number text,
	description text,
	driver_name text REFERENCES device_drivers (driver_name) ON DELETE RESTRICT,
	dynamic_ports boolean,
	automated_serial_number boolean
);

CREATE TABLE device_classes (
	class_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	description text
);

CREATE TABLE device_model_classes (
	model_id integer REFERENCES device_models (model_id) ON DELETE CASCADE,
	class_id integer REFERENCES device_classes (class_id) ON DELETE CASCADE,
	PRIMARY KEY(model_id, class_id)
);

CREATE TABLE model_ports (
	model_id integer REFERENCES device_models (model_id) ON DELETE CASCADE,
	port_name text,
	direction av_port_direction,
	port_type av_port_type,
	PRIMARY KEY(model_id, port_name)
);

-- Devices

CREATE TABLE devices (
	device_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	room_id integer REFERENCES rooms (room_id) ON DELETE SET NULL,
	device_name text,
	address text,
	model_id integer REFERENCES device_models (model_id) ON DELETE SET NULL,
	install_date timestamptz,
	warranty_date timestamptz,
	location text,
	serial_number text,
	icon text,
	funding_type funding_type,
	proxy_base_url text,
	notes text
);

CREATE TABLE device_ports (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	port_name text,
	direction av_port_direction,
	port_type av_port_type,
	PRIMARY KEY(device_id, port_name)
);

CREATE TABLE device_port_endpoints (
	device_id integer,
	port_name text,
	connected_device_id integer,
	connected_port_name text,
	PRIMARY KEY(device_id, port_name, connected_device_id, connected_port_name),
	FOREIGN KEY (device_id, port_name) REFERENCES device_ports (device_id, port_name),
	FOREIGN KEY (connected_device_id, connected_port_name) REFERENCES device_ports (device_id, port_name)
);

CREATE TABLE device_tags (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	tag_key text,
	tag_value text,
	PRIMARY KEY(device_id, tag_key)
);

CREATE TABLE device_presets (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	preset_name text,
	preset_value text,
	PRIMARY KEY(device_id, preset_name)
);

-- Systems

CREATE TABLE av_systems (
	system_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	system_name text,
	designation av_system_designation,
	install_date timestamptz,
	check_date timestamptz
);

CREATE TABLE av_system_devices (
	system_id integer REFERENCES av_systems (system_id) ON DELETE CASCADE,
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	PRIMARY KEY(system_id, device_id)
);

CREATE TABLE av_system_rooms (
	system_id integer REFERENCES av_systems (system_id) ON DELETE CASCADE,
	room_id integer REFERENCES rooms (room_id) ON DELETE CASCADE,
	PRIMARY KEY(system_id, room_id)
);

CREATE TABLE system_control_docs (
	system_id integer PRIMARY KEY REFERENCES av_systems (system_id) ON DELETE CASCADE,
	system_control_doc jsonb
);

CREATE TABLE system_compiled_ui_configs (
	system_id integer PRIMARY KEY REFERENCES av_systems (system_id) ON DELETE CASCADE,
	system_compiled_ui_config jsonb
);

-- UI Control Groups

CREATE TABLE ui_control_groups (
	control_group_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	system_id integer REFERENCES av_systems (system_id) ON DELETE CASCADE,
	control_group_name text,
	master_volume_device_id integer REFERENCES devices (device_id) ON DELETE SET NULL,
	master_volume_device_block text
);

CREATE TABLE ui_control_panels (
	device_id integer PRIMARY KEY REFERENCES devices (device_id) ON DELETE CASCADE,
	control_group_id integer REFERENCES ui_control_groups (control_group_id) ON DELETE CASCADE,
	ui_type control_panel_ui_type
);

CREATE TABLE ui_microphone_groups (
	microphone_group_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	microphone_group_name text,
	control_group_id integer REFERENCES ui_control_groups (control_group_id) ON DELETE CASCADE
);

CREATE TABLE ui_microphones (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	microphone_group_id integer REFERENCES ui_microphone_groups (microphone_group_id) ON DELETE CASCADE,
	PRIMARY KEY(device_id, microphone_group_id)
);

CREATE TABLE ui_inputs (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	control_group_id integer REFERENCES ui_control_groups (control_group_id) ON DELETE CASCADE,
	PRIMARY KEY(device_id, control_group_id)
);

CREATE TABLE ui_cameras (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	control_group_id integer REFERENCES ui_control_groups (control_group_id) ON DELETE CASCADE,
	PRIMARY KEY(device_id, control_group_id)
);

CREATE TABLE ui_displays (
	device_id integer REFERENCES devices (device_id) ON DELETE CASCADE,
	control_group_id integer REFERENCES ui_control_groups (control_group_id) ON DELETE CASCADE,
	default_input text,
	PRIMARY KEY(device_id, control_group_id)
);


-- Config

CREATE TABLE config (
	config_id text PRIMARY KEY,
	config_value jsonb
);


-- Exit schema
SET search_path TO public;
RESET ROLE;
