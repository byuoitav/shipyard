import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as API from '../../api.service';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss']
})
export class DevicesViewComponent implements OnInit {

  @Input() selectedID: number = 0;

  systemDisplayedColumns: string[] = ['name', 'designation'];
  deviceSystems: API.system[] = [];

  buildings: API.building[] = [];
  rooms: API.room[] = [];
  deviceModels: API.deviceModel[] = [];


  device: API.device= {
    id: 0,
    name: "Please Select a Device",
    roomID: 0,
    modelID: 0,
    installDate: new Date(),
    warrantyDate: new Date(),
    location: "",
    serialNumber: "",
    icon: "",
    fundingType: "",
    proxyBaseURL: "",
    notes: "",
    address: "",
    ports: [],
    systemIDs: [],
    tags: [],
  };

  constructor(
    private api: API.ApiService,
  ) {
    this.buildings = this.api.getAllBuildings();
    this.rooms = this.api.getAllRooms();
    this.deviceModels = this.api.getAllDeviceModels();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    if (id === undefined) {
      return;
    }
    let newDevice = this.api.getDevice(id);
    // if we fail to load building
    if (newDevice === null) {
      return;
    }

    this.device = newDevice;
    this.deviceSystems = this.api.getDeviceSystems(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    // This line guarantees that this.selectedID is a number not a string
    this.selectedID = +this.selectedID;

    this.select(this.selectedID)
  }

  getRoomBuilding(roomID: number): string {
    for (var r of this.rooms) {
      if (r.id === roomID) {
        return this.getBuildingAbbr(r.buildingID);
      }
    }
    return "";
  }

  getBuildingAbbr(id: number): string {
    for (var b of this.buildings) {
      if (b.id === id) {
        return b.abbreviation;
      }
    }
    return "";
  }

  getDeviceModelNumber(modelID: number): string {
    for (let m of this.deviceModels) {
      if (m.id === modelID) {
        return m.modelNumber;
      }
    }
    return "";
  }

  getDeviceModelManu(modelID: number): string {
    for (let m of this.deviceModels) {
      if (m.id === modelID) {
        return m.manufacturer;
      }
    }
    return "";
  }

  getRoomNumber(roomID: number): string {
    for (let r of this.rooms) {
      if (r.id === roomID) {
        return r.roomNumber;
      }
    }
    return "";
  }

}

