import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../device';

@Component({
  selector: 'app-devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['./devices-dialog.component.scss']
})
export class DevicesDialogComponent implements OnInit {
  ID: String;
  Desc: String;
  Address: String;
  Driver: String;
  Tags: Map<String, String>;
  tagKey: String;
  tagValue: String;

  constructor(private dialogRef: MatDialogRef<DevicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Device) {
      if (data != null) {
        this.ID = data.ID;
        this.Desc = data.Desc;
        this.Address = data.Address;
        this.Tags = new Map();
        data.Tags.forEach((value, key) => {
          this.Tags.set(key, value);
        });
      }
    }

  ngOnInit(): void {
  }

  addTag() {
    this.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.Tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {
    this.dialogRef.close(false);
  }

  onSave() {
    this.data.ID = this.ID;
    this.data.Desc = this.Desc;
    this.data.Address = this.Address;
    this.data.Tags = this.Tags;
    this.dialogRef.close(true);
  }
}
