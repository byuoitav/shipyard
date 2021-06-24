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
  modelList: any[] = [];
  manufacturerList: any[] = [];

  constructor(private api: ApiService,
    private dialogRef: MatDialogRef<DeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      if (data) {
        this.device = data;
      }
      this.manufacturerList = this.getDeviceManufacturerList();
      this.modelList = this.getDeviceModelList();
    }

  ngOnInit(): void {
  }

  getDeviceModelList() {
    return [
      {id: "1", name: "Device Model 1"},
      {id: "2", name: "Device Model 2"},
      {id: "3", name: "Device Model 3"},
      {id: "4", name: "Device Model 4"},
      {id: "5", name: "Device Model 5"},
      {id: "6", name: "Device Model 6"}
    ];
  }

  getDeviceManufacturerList() {
    return [
      "Manufacturer 1",
      "Manufacturer 2",
      "Manufacturer 3",
      "Manufacturer 4",
      "Manufacturer 5",
      "Manufacturer 6"
    ];
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.device);
  }
}
