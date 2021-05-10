import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-campuses',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.scss']
})
export class CampusesComponent implements OnInit {
  roomID: string = "";
  room: Room;

  tagKey: string = "";
  tagValue: string = "";

  description: string = "this is a test of the emergency broadcast system";
  notes: string = "the test will consist of three stages";

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

  removeTag(key: string) {
    this.room.Tags.delete(key);
  }

}
