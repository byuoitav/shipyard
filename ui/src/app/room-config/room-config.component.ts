import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Device } from '../services/device';
import { Room } from '../services/room';

@Component({
  selector: 'app-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.scss']
})
export class RoomConfigComponent implements OnInit {
  roomID: string = "";
  room: Room = new Room();

  devices: Device[] = [];

  tagKey: string = "";
  tagValue: string = "";

  description: string = "this is a test of the emergency broadcast system";
  notes: string = "the test will consist of three stages";

  constructor(private route: ActivatedRoute,
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

  removeTag(key: string) {
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

