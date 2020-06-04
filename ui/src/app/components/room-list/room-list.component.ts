import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  bldgID: String;
  building: Building;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.bldgID = params["bldgID"];
    });
  }

  ngOnInit(): void {
  }

}
