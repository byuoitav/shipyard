import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../components/room-page/devices/device';
import { Room } from '../components/room-page/room';
import { RoomConfig } from '../components/room-page/ui-config/ui-config';

@Injectable({
  providedIn: 'root'
})
export class ApiProxyService {
    url = location.origin;

    constructor(private http: HttpClient) { }
    // Rooms
    getRoomList(): Observable<Object> {
        return this.http.get(this.url + "/rooms");
    }

    getRoom(roomID: String) {
        return this.http.get(this.url + "/rooms/" + roomID.toString());
    }

    saveRoom(roomData: Room) {
        return this.http.put(this.url + "/rooms/" + roomData.id.toString(), roomData);
    }

    // Devices
    getRoomDevices(roomID: String) {
        return this.http.get(this.url + "/rooms/" + roomID.toString() + "/devices");
    }

    getDevice(deviceID: String) {
        return this.http.get(this.url + "/devices" + deviceID.toString());
    }

    saveDevice(deviceData: Device) {
        return this.http.put(this.url + "/devices/" + deviceData.id.toString(), deviceData);
    }

    // UIConfig
    getUIConfig(roomID: String) {
        return this.http.get(this.url + "/ui_config/" + roomID.toString());
    }

    saveUIConfig(UIConfigData: RoomConfig) {
        return this.http.put(this.url + "/ui_config/" + UIConfigData.id.toString(), UIConfigData);
    }

    // Device Menu ---- for current convenience, will be deleted. Device menu will probably be generated from list of device types
    getDeviceMenu() {
        return this.http.get(this.url + "/menu");
    }
}
