import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'src/app/services/api.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
  room: Room;
  newRoom: boolean;

  constructor(private dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Room) {
    if (data != null) {
      this.room = data;
      this.newRoom = false;
    } else {
      this.room = {
        ID: ""
      }
      this.newRoom = true;
    }
  }

  ngOnInit(): void {
  }

  

}
