import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from '../room-page/room';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
  room = new Room();
  newRoom = true;
  tagKey: string = "";
  tagValue: string = "";


  constructor(private dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Room) {
    if (data != null) {
      this.copyRoom(data);
      this.newRoom = false;
    }
  }

  ngOnInit(): void {
  }

  copyRoom(rm: Room) {
      if (rm != null) {
        this.room.id = rm.id;
        this.room.privateDescription = rm.privateDescription;
        this.room.publicDescription = rm.publicDescription;
        this.room.proxyBaseURL = rm.proxyBaseURL;
        rm.tags.forEach((value, key) => {
            this.room.tags.set(key, value);
        });
    }
  }

  addTag() {
    this.room.tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: string) {
    this.room.tags.delete(key);
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
