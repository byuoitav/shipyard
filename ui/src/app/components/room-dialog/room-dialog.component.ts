import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'src/app/services/api.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
  room: Room = {
    ID: "",
    Desc: "",
    Tags: new Map()
  };
  newRoom = true;
  tagKey: String;
  tagValue: String;


  constructor(private dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Room) {
    if (data != null) {
      // make a deep copy
      this.room.ID = data.ID;
      this.room.Desc = data.Desc;
      data.Tags.forEach((value, key) => {
        this.room.Tags.set(key, value);
      });
      this.newRoom = false;
    }
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

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {
    this.dialogRef.close("delete");
  }

  onSave() {
    this.dialogRef.close(this.room);
  }

}
