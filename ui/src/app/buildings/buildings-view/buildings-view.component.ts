import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as API from '../../api.service';

interface Building {
  id: number,
  name: string,
  abbreviation: string,
  campusAbbreviation: string,
}

interface Room {
  id: number,
  buildingID: number,
  number: string,
  type: string,
}

@Component({
  selector: 'app-buildings-view',
  templateUrl: './buildings-view.component.html',
  styleUrls: ['./buildings-view.component.scss']
})
export class BuildingsViewComponent implements OnInit {

  @Input() selectedID: number = 0;

  displayedColumns: string[] = ['number', 'type'];
  buildingRooms: API.room[] = [];

  building: API.building = {
    id: 0,
    abbreviation: "",
    name: "Please Select a Building",
    campusAbbreviation: "",
  };

  constructor(
    private api: API.ApiService,
  ) {
  }

  ngOnInit(): void {
  }

  select(id: any) {
    if (id === undefined) {
      return;
    }
    let newBuilding = this.api.getBuilding(id);
    // if we fail to load building
    if (newBuilding === null) {
      return;
    }

    this.building = newBuilding;
    this.buildingRooms = this.api.getBuildingRooms(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    // This line guarantees that this.selectedID is a number not a string
    this.selectedID = +this.selectedID;

    this.select(this.selectedID)
  }

}
