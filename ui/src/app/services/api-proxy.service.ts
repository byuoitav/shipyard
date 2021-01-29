import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../components/room-page/devices/device';
import { Room } from '../components/room-page/room';
import { RoomConfig } from '../components/room-page/ui-config/ui-config';

@Injectable({
  providedIn: 'root'
})
export class ApiProxyService {
    url = "this is a temporary url";

    constructor(private http: HttpClient) { }
    // Rooms
    getRoomList(): String[] {
        this.http.get(this.url + "/rooms").subscribe(
            (resp: String[]) => {
                console.log("retrieved room list");
                return resp;
            },
            err => {
                console.log("failed to retrieve room list");
                console.log(err);
                return null;
            }
        );
        return null;
    }

    getRoom(roomID: String): Room {
        this.http.get(this.url + "/rooms/" + roomID.toString()).subscribe(
            resp => {
                console.log("retrieved data for room: " + roomID);
                return resp;
            },
            err => {
                console.log("failed to retrieve data for room: " + roomID);
                console.log(err);
                return null;
            }
        );
        return null;
    }

    saveRoom(roomData: Room): boolean {
        this.http.post(this.url + "/rooms/" + roomData.id.toString(), roomData).subscribe(
            resp => {
                if (resp["success"]) {
                    console.log("");
                    return true;
                } else {
                    return false;
                }
            },
            err => {
                return false;
            }
        );
        return null;
    }

    // Devices
    getRoomDevices(roomID: String): Device[] {
        this.http.get(this.url + "/rooms/" + roomID.toString() + "/devices").subscribe(
            (resp: Device[]) => {
                console.log("retrieved device list for room: " + roomID);
                return resp;
            },
            err => {
                console.log("failed to retrieve device list for room: " + roomID);
                console.log(err);
                return null;
            }
        );
        return null;
    }

    getDevice(deviceID: String): Device {
        this.http.get(this.url + "/devices" + deviceID.toString()).subscribe(
            (resp: Device) => {
                console.log("retrieved data for device: " + deviceID);
                return resp;
            },
            err => {
                console.log("failed to retrieve data for device: " + deviceID);
                console.log(err);
                return null;
            }
        );
        return null;
    }

    saveDevice(deviceData: Device): boolean {
        this.http.post(this.url + "/devices/" + deviceData.id.toString(), deviceData).subscribe(
            resp => {
                if (resp["success"]) {
                    console.log("");
                    return true;
                } else {
                    return false;
                }
            },
            err => {
                return false;
            }
        );
        return null;
    }

    // UIConfig
    getUIConfig(roomID: String): RoomConfig {
        this.http.get(this.url + "/ui_config/" + roomID.toString()).subscribe(
            (resp: RoomConfig) => {
                console.log("retrieved ui config for room: " + roomID);
                return resp;
            },
            err => {
                console.log("failed to retrieve ui config for room: " + roomID);
                console.log(err);
                return null;
            }
        );
        return null;
    }

    saveUIConfig(UIConfigData: RoomConfig): boolean {
        this.http.post(this.url + "/ui_config/" + UIConfigData.ID.toString(), UIConfigData).subscribe(
            resp => {
                if (resp["success"]) {
                    console.log("");
                    return true;
                } else {
                    return false;
                }
            },
            err => {
                return false;
            }
        );
        return null;
    }
}
