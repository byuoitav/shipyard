import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../api.service';

interface Campus {
  abbreviation: string;
  name: string;
}

interface Building{
  id: number;
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-campus-view',
  templateUrl: './campus-view.component.html',
  styleUrls: ['./campus-view.component.scss']
})
export class CampusViewComponent implements OnInit {

  @Input() selectedID: any;

  displayedColumns: string[] = ['abbreviation', 'name'];
  campusBuildings: Building[] = [];

  editing: boolean = false;

  campus: Campus = {
    abbreviation: "",
    name: "Please Select a Campus",
  };

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  select(id: any) {
    if (id === undefined) {
      return;
    }
    let newCampus = this.api.getCampus(id);

    // Failed to get the campus
    if (newCampus === null) {
      return;
    }
    this.campus = newCampus;
    this.campusBuildings = this.api.getCampusBuildings(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.select(this.selectedID)
  }

  goToBuilding(id: number) {

  }

}
