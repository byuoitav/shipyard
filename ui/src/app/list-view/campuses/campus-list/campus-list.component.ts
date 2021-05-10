import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../api.service';

interface Campus {
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.scss']
})
export class CampusListComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter();

  selectedRowIndex: any = "";

  displayedColumns: string[] = ['abbreviation', 'name'];
  campusData: Campus[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedRowIndex = params['id'];
    })

    this.campusData = api.getAllCampuses();
  }

  ngOnInit(): void {
  }

  select(id: any) {
    this.selectedRowIndex = id;
    this.selectedEvent.emit(id);
  }

}
