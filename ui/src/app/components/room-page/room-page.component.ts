import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Room } from './room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  roomID: String;
  room: Room;

  tagKey: String;
  tagValue: String;

  description: String = "this is a test of the emergency broadcast system";
  notes: String = "the test will consist of three stages";

  constructor(private route: ActivatedRoute,
    private api: ApiService) {
    this.route.params.subscribe(params => {
      this.roomID = params["roomID"];
    });

    this.room = this.api.getRoom(this.roomID);
  }

  ngOnInit(): void {
  }

  addTag() {
    this.room.tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.room.tags.delete(key);
  }

}
