import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { Port } from 'src/app/services/port';
import { PortModalComponent } from '../port-modal/port-modal.component';

@Component({
  selector: 'app-port-config',
  templateUrl: './port-config.component.html',
  styleUrls: ['./port-config.component.scss']
})
export class PortConfigComponent implements OnInit {

  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name'
  ];

  selectedDevice: Device = new Device();
  portColumns: string[] = [
    'name',
    'connection'
  ];


  constructor(private api: ApiService,
    private dialog: MatDialog) {
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

  getDeviceName() {
    if (this.selectedDevice) {
      return this.selectedDevice.name;
    }
    return "";
  }

  connectPort(port: Port) {
    const portModalRef = this.dialog.open(PortModalComponent, {data: { deviceID: this.selectedDevice.id }});

    portModalRef.afterClosed().subscribe(conn => {
      if (conn) {
        // make the connection
      }
    });
  }

}
