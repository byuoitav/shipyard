import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Device } from '../services/device';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  device: Device = new Device()

  constructor(private api: ApiService,
    private dialogRef: MatDialogRef<DeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      if (data) {
        this.device = data;
      }
    }

  ngOnInit(): void {
  }

  getDeviceModelList() {
    return [];
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.device);
  }
}
