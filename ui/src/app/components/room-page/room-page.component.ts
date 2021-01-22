import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

export class Room {
  ID: String;
  Desig: String;
  Desc: String;
  Notes: String;
  ProxyBaseURL: String;
  Tags: Map<String, String>;

  constructor(rm: Room) {
    this.Tags = new Map();
    if (rm != null) {
      this.ID = rm.ID;
      this.Desc = rm.Desc;
      rm.Tags.forEach((value, key) => {
        this.Tags.set(key, value);
      });
    } else {
      this.ID = "";
      this.Desc = "";
    }
  }
}

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
    this.room.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.room.Tags.delete(key);
  }

}
