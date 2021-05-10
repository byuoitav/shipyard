import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as API from '../../api.service';

@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.scss']
})
export class BuildingsListComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter();

  selectedRowIndex: number = 0;

  displayedColumns: string[] = ['abbreviation', 'name', 'campusAbbreviation'];
  buildingData: API.building[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: API.ApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedRowIndex = params['id'];
    })

    this.buildingData = api.getAllBuildings();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    id = parseInt(id);
    this.selectedRowIndex = id;
    this.selectedEvent.emit(id);
  }

}
