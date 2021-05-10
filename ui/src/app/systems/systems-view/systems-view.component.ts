import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as API from '../../api.service';

@Component({
  selector: 'app-systems-view',
  templateUrl: './systems-view.component.html',
  styleUrls: ['./systems-view.component.scss']
})
export class SystemsViewComponent implements OnInit {

  @Input() selectedID: number = 0;

  roomDisplayedColumns: string[] = ['buildingAbbr', 'roomNumber', 'type'];
  deviceDisplayedColumns: string[] = ['name', 'model', 'manufacturer'];
  systemRooms: API.room[] = [];
  systemDevices: API.device[] = [];

  deviceModels: API.deviceModel[] = [];
  buildings: API.building[] = [];
  rooms: API.room[] = [];


  system: API.system= {
    id: 0,
    name: "Please Select a System",
    designation: "",
    installDate: new Date(),
    checkDate: new Date(),
    deviceIDs: [],
    roomIDs: [],
  };

  constructor(
    private api: API.ApiService,
  ) {
    this.deviceModels = this.api.getAllDeviceModels();
    this.buildings = this.api.getAllBuildings();
    this.rooms = this.api.getAllRooms();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    if (id === undefined) {
      return;
    }
    let newSystem = this.api.getSystem(id);
    // if we fail to load building
    if (newSystem === null) {
      return;
    }

    this.system = newSystem;
    this.systemRooms = this.api.getSystemRooms(id);
    this.systemDevices = this.api.getSystemDevices(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    // This line guarantees that this.selectedID is a number not a string
    this.selectedID = +this.selectedID;

    this.select(this.selectedID)
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

  getRoomBuilding(roomID: number): string {
    for (var r of this.rooms) {
      if (r.id === roomID) {
        return this.getBuildingAbbr(r.buildingID);
      }
    }
    return "";
  }

  getRoomNumber(roomID: number): string {
    for (var r of this.rooms) {
      if (r.id === roomID) {
        return r.roomNumber;
      }
    }
    return "";
  }

  getBuildingAbbr(buildingID: number): string {
    for (var b of this.buildings) {
      if (b.id === buildingID) {
        return b.abbreviation;
      }
    }
    return "";
  }

  getBuildingCampus(id: number): string {
    for (var b of this.buildings) {
      if (b.id === id) {
        return b.campusAbbreviation;
      }
    }
    return "";
  }

}
