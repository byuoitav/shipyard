import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as API from '../../api.service';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter();

  selectedRowIndex: number = 0;

  displayedColumns: string[] = [
    'buildingAbbr',
    'number',
    'type',
    'campusAbbreviation'
  ];

  roomData: API.room[] = [];
  buildings: API.building[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: API.ApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedRowIndex = params['id'];
    })

    this.roomData = api.getAllRooms();
    this.buildings = api.getAllBuildings();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    this.selectedRowIndex = id;
    this.selectedEvent.emit(id);
  }

  getBuildingAbbr(id: number): string {
    for (var b of this.buildings) {
      if (b.id === id) {
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
