import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/services/api.service';

@Component({
  selector: 'app-devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['./devices-dialog.component.scss']
})
export class DevicesDialogComponent implements OnInit {
  device = new Device(null);
  newDevice = true;
  tagKey: String;
  tagValue: String;

  constructor(private dialogRef: MatDialogRef<DevicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Device) {
      if (data != null) {
        this.device = new Device(data);
        this.newDevice = false;
      }
    }

  ngOnInit(): void {
  }

  addTag() {
    this.device.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.device.Tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {
    this.dialogRef.close(this.device.ID);
  }

  onSave() {
    this.dialogRef.close(this.device);
  }
}
