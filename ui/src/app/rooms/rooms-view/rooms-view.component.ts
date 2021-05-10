import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as API from '../../api.service';


@Component({
  selector: 'app-rooms-view',
  templateUrl: './rooms-view.component.html',
  styleUrls: ['./rooms-view.component.scss']
})
export class RoomsViewComponent implements OnInit {

  @Input() selectedID: number = 0;

  systemDisplayedColumns: string[] = ['name', 'designation'];
  deviceDisplayedColumns: string[] = ['name', 'model', 'manufacturer'];
  roomSystems: API.system[] = [];
  roomDevices: API.device[] = [];

  buildings: API.building[] = [];
  deviceModels: API.deviceModel[] = [];

  room: API.room= {
    id: 0,
    buildingID: 0,
    roomNumber: "Please pick a room",
    type: "",
    publishedDescription: "",
    systemIDs: [],
    notes: "",
    photos: [],
    tags: [],
  };

  constructor(
    private api: API.ApiService,
  ) {
    this.buildings = this.api.getAllBuildings();
    this.deviceModels = this.api.getAllDeviceModels();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    if (id === undefined) {
      return;
    }
    let newRoom = this.api.getRoom(id);
    // if we fail to load building
    if (newRoom === null) {
      return;
    }

    this.room = newRoom;
    this.roomSystems = this.api.getRoomSystems(id);
    this.roomDevices = this.api.getRoomDevices(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    // This line guarantees that this.selectedID is a number not a string
    this.selectedID = +this.selectedID;

    this.select(this.selectedID)
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


}
