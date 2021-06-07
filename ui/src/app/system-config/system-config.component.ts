import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Device } from '../services/device';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name'
  ];

  selectedDevice: Device | null = null;
  portColumns: string[] = [
    'name',
    'connection'
  ];


  constructor(private api: ApiService) {
    this.updateDeviceTable();
    if (this.devices.length > 0) {
      this.selectedDevice = this.devices[0];
    }
  }

  ngOnInit(): void {
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices("test");
    this.deviceData.data = this.devices;
  }

  getPortList() {
    if (this.selectedDevice) {
      return this.selectedDevice.ports;
    }
    return [];
  }

  selectDevice(dev: Device) {
    this.selectedDevice = dev;
  }

}
