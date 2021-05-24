import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../device';

@Component({
  selector: 'app-devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['./devices-dialog.component.scss']
})
export class DevicesDialogComponent implements OnInit {
  id: string = "";
  publicDescription: string = "";
  address: string = "";
  driver: string = "";
  tags: Map<string, string> = new Map();
  tagKey: string = "";
  tagValue: string = "";

  constructor(private dialogRef: MatDialogRef<DevicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Device) {
      if (data != null) {
        this.id = data.id;
        this.publicDescription = data.publicDescription;
        this.address = data.address;
        data.tags.forEach((value, key) => {
          this.tags.set(key, value);
        });
      }
    }

  ngOnInit(): void {
  }

  addTag() {
    this.tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: string) {
    this.tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onDelete() {
    this.dialogRef.close(false);
  }

  onSave() {
    this.data.id = this.id;
    this.data.publicDescription = this.publicDescription;
    this.data.address = this.address;
    this.data.tags = this.tags;
    this.dialogRef.close(true);
  }
}
