import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Device } from '../services/device';
import { System } from '../services/system';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  selectedTab: number = 0;
  device: Device = new Device()
  modelList: any[] = [];
  manufacturerList: any[] = [];
  fundingTypeList: any[] = [];

  systems: System[] = [];
  systemColumns: string[] = [
    'name',
    'designation'
  ];

  constructor(private api: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<DeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      if (data.device) {
        this.device = data.device;
      }
      if (data.tab) {
        this.selectedTab = 1;
      }
      this.manufacturerList = this.getDeviceManufacturerList();
      this.modelList = this.getDeviceModelList();
      this.fundingTypeList = this.getFundingTypes();
      this.systems = this.getDeviceSystems();
    }

  ngOnInit(): void {
  }

  getDeviceModelList() {
    return [
      {id: "1", name: "Model 1"},
      {id: "2", name: "Model 2"},
      {id: "3", name: "Model 3"},
      {id: "4", name: "Model 4"},
      {id: "5", name: "Model 5"},
      {id: "6", name: "Model 6"}
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

  getFundingTypes(): string[] {
    return [
      "Type 1",
      "Type 2",
      "Type 3"
    ];
  }

  getDeviceSystems() {
    let systems: any[] = [];
    this.device.systemIDs.forEach(s => {
      let sys = this.api.getSystemByID(s);
      //Todo: check if returned system is valid
      systems.push(sys);
    });
    return systems;
  }

  navigateToSystem(sysID: number) {
    this.router.navigate(["/system/" + sysID]);
    this.onCancel();
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.device);
  }
}
