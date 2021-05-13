
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProxyService } from 'src/app/services/api-proxy.service';
import { ApiService } from 'src/app/services/api.service';
import { Device } from './devices/device';
import { Room } from './room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  roomID: String = "";
  room: Room;

  devices: Device[];

  tagKey: String;
  tagValue: String;

  description: String = "this is a test of the emergency broadcast system";
  notes: String = "the test will consist of three stages";

  constructor(private route: ActivatedRoute,
    private proxy: ApiProxyService,
    private api: ApiService) {
    this.route.params.subscribe(params => {
      this.roomID = params["roomID"];
    });
  }

  ngOnInit(): void {
    // this.room = this.route.snapshot.data.room;
    this.room = this.api.getRoom(this.roomID);

    // this.proxy.getRoomDevices(this.roomID).subscribe((data: Device[]) => {
    //   this.devices = data;
    // });
    this.devices = this.api.getDevices(this.roomID);
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
    // this.proxy.saveRoom(this.room).subscribe(
    //   resp => {
    //       if (resp["success"]) {
    //           console.log(true);
    //       } else {
    //           console.log(false);
    //       }
    //   },
    //   err => {
    //       console.log(err);
    //   }
    // );

  }

}
