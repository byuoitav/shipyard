import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/components/room-page/room-page.component';
import { Device } from '../components/room-page/devices/device';
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
        (data: String[]) => {
            console.log("Retrieved room list");
            return data;
        },
        err => {
            console.log("Failed to retrieve room list");
            console.log(err);
            return null;
        }
    );
    return null;
}

getRoom(roomID: String): Room {
    this.http.get(this.url + "/rooms/" + roomID.toString()).subscribe(
        data => {
            return data;
        },
        err => {
            return null;
        }
    );
    return null;
}

saveRoom(roomData: Object): boolean {
    return null;
}

// Devices
getRoomDevices(roomID: String): Device[] {
    this.http.get(this.url + "/rooms/" + roomID.toString() + "/devices").subscribe(
        (data: Device[]) => {
            return data;
        },
        err => {
            return null;
        }
    );
    return null;
}

getDevice(deviceID: String): Device {
    this.http.get(this.url + "/devices" + deviceID.toString()).subscribe(
        (data: Device) => {
            return data;
        },
        err => {
            return null;
        }
    );
    return null;
}

saveDevice(deviceData: Object): boolean {
    return null;
}

// UIConfig
getUIConfig(roomID: String): RoomConfig {
    this.http.get(this.url + "/ui_config/" + roomID.toString()).subscribe(
        (data: RoomConfig) => {
            return data;
        },
        err => {
            return null;
        }
    );
    return null;
}

saveUIConfig(UIConfigData: Object): boolean {
    return null;
}
}
