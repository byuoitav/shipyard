import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as API from '../../api.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter();

  selectedRowIndex: number = 0;

  displayedColumns: string[] = [
    'name',
    'roomNumber',
    'buildingAbbr',
  ];

  deviceData: API.device[] = [];
  rooms: API.room[] = [];
  buildings: API.building[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: API.ApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedRowIndex = params['id'];
    })

    this.deviceData = this.api.getAllDevices();
    this.rooms = this.api.getAllRooms();
    this.buildings = this.api.getAllBuildings();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    this.selectedRowIndex = id;
    this.selectedEvent.emit(id);
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
