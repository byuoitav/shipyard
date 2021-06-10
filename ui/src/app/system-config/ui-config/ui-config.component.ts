import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.scss']
})
export class UiConfigComponent implements OnInit {

  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name'
  ];

  constructor(private api: ApiService) {
    this.updateDeviceTable();
  }

  ngOnInit(): void {
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices("test");
    this.deviceData.data = this.devices;
  }
}
