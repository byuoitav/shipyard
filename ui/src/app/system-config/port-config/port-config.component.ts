import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { Endpoint, Port } from 'src/app/services/port';
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
    'name',
    'manufacturer',
    'model'
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

  addDevice(dev: Device | null) {
    const deviceModal = this.dialog.open(DeviceModalComponent, {data: dev});

    deviceModal.afterClosed().subscribe(resp => {

    });
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

  getRoomFromID(id: number) {
    var room = this.api.getRoomByID(id);
    return room.id;
  }

  getModelNameFromID(id: number) {
    var model = this.api.getModelByID(id);
    return model.name;
  }

  getManufacturerFromModelID(id: number) {
    var model = this.api.getModelByID(id);
    return model.manufacturer;
  }

  connectPort(port: Port) {
    const portModalRef = this.dialog.open(PortModalComponent, {data: { 
      device: this.selectedDevice,
      port: port
    }});

    portModalRef.afterClosed().subscribe(conn => {
      if (conn) {
        // make the connection
          // add endpoint to 'port'
        if (port.endpoints.length > 0) this.removePortEndpoint(port.endpoints[0]);
        port.endpoints = [];
        port.endpoints.push({
          device: conn.device.name,
          port: conn.port.name
        });
          // find other device and add endpoint to that port
        if (conn.port.endpoints.length > 0) this.removePortEndpoint(conn.port.endpoints[0]);
        conn.port.endpoints = [];
        conn.port.endpoints.push({
          device: this.selectedDevice.name,
          port: port.name
        })
      }
    });
  }

  removePortEndpoint(e: Endpoint) {
    this.devices.forEach(d => {
      if (d.name === e.device) {
        d.ports.forEach(p => {
          if (p.name === e.port) {
            p.endpoints = [];
          }
        });
      }
    });
  }
}
