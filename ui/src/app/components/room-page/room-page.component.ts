import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  roomID: String;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.roomID = params["roomID"];
    });
  }

  ngOnInit(): void {
  }

}
