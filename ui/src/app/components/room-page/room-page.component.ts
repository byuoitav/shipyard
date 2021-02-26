
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProxyService } from 'src/app/services/api-proxy.service';
import { Room } from './room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  roomID: String = "";
  room: Room;

  tagKey: String;
  tagValue: String;

  description: String = "this is a test of the emergency broadcast system";
  notes: String = "the test will consist of three stages";

  constructor(private route: ActivatedRoute,
    private proxy: ApiProxyService,) {
    this.route.params.subscribe(params => {
      this.roomID = params["roomID"];
    });
    // this.proxy.getRoom(this.roomID).subscribe((data: Room) => {
    //   console.log(data);
    //   this.room = data;
    // });
  }

  ngOnInit(): void {
    this.room = this.route.snapshot.data.room;
  }

  addTag() {
    this.room.tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.room.tags.delete(key);
  }

  save() {
    this.proxy.saveRoom(this.room).subscribe(
      resp => {
          if (resp["success"]) {
              console.log(true);
          } else {
              console.log(false);
          }
      },
      err => {
          console.log(err);
      }
    );

  }

}
