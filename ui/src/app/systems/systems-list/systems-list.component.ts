import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as API from '../../api.service';

@Component({
  selector: 'app-systems-list',
  templateUrl: './systems-list.component.html',
  styleUrls: ['./systems-list.component.scss']
})
export class SystemsListComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter();

  selectedRowIndex: number = 0;

  displayedColumns: string[] = [
    'name',
    'designation',
  ];

  systemData: API.system[] = [];
  buildings: API.building[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: API.ApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedRowIndex = params['id'];
    })

    this.systemData= api.getAllSystems();
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
