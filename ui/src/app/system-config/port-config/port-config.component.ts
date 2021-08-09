import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { Endpoint, Port } from 'src/app/services/port';
import { PortModalComponent } from '../port-modal/port-modal.component';
import { PortDeleteConfirmComponent } from './port-delete-confirm';
import { PortEditComponent } from './port-edit';

@Component({
  selector: 'app-port-config',
  templateUrl: './port-config.component.html',
  styleUrls: ['./port-config.component.scss']
})
export class PortConfigComponent implements OnInit {

  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  portData: MatTableDataSource<Port> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name',
    'manufacturer',
    'model',
    'systems'
  ];

  selectedDevice: Device = new Device();
  portColumns: string[] = [
    'name',
    'connection',
    'portEdit'
  ];

  constructor(private api: ApiService,
    private dialog: MatDialog,
    private router: Router) {
    this.updateDeviceTable();
    if (this.devices.length > 0) {
      this.selectedDevice = this.devices[0];
    }
    this.updatePortTable();
  }

  ngOnInit(): void {
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices(0);
    this.deviceData.data = this.devices;
  }

  updatePortTable() {
    this.portData.data = this.getPortList();
  }

  addDevice(dev: Device | null, tabOver: boolean) {
    const deviceModal = this.dialog.open(DeviceModalComponent, { data: {
      device: dev,
      tab: tabOver
    } });

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
    this.updatePortTable();
  }

  addPort(p: Port | null) {
    var portEditModal = this.dialog.open(PortEditComponent, { data: {
      deviceName: this.selectedDevice.name,
      port: p
    }});

    portEditModal.afterClosed().subscribe(resp => {
      if (resp) {
        if (p == null) {
          let port = new Port();
          port.name = resp.name;
          port.direction = resp.direction;
          port.id = this.selectedDevice.ports.length + 1; // TEMPORARY once the api is integrated, this will be handled by the backend
          this.selectedDevice.ports.push(port);
        } else {
          p.direction = resp.direction;
          // update endpoint
          for (var i = 0; i < p.endpoints.length; i++) {
            let device = this.getDeviceFromID(p.endpoints[i].connectedDeviceID);
            for (var j = 0; j < device.ports.length; j++) {
              if (device.ports[j].name === p.endpoints[i].connectedPortName) {
                if (device.ports[j].direction === resp.direction) {
                  // delete endpoint
                  this.removePortEndpoint(p.endpoints[i])
                  p.endpoints.splice(i, 1);
                } else {
                  // update endpoint
                  device.ports[j].endpoints.forEach(ep => {
                    if (ep.connectedDeviceID === this.selectedDevice.id) {
                      if (ep.connectedPortName === p.name) {
                        ep.connectedPortName = resp.name;
                      }
                    }
                  });
                }
              }
            }
          }
          p.name = resp.name;
        }
        this.updatePortTable();
      }
    });
  }

  editDynamicPort(e: Event, p: Port) {
    e.stopPropagation();
    
    this.addPort(p);
  }

  onDeletePort(e: Event, p: Port) {
    e.stopPropagation();
    var portDeleteModal = this.dialog.open(PortDeleteConfirmComponent, {data: this.selectedDevice.name + " : " + p.name});

    portDeleteModal.afterClosed().subscribe(confirmDelete => {
      if (confirmDelete) {
        // delete port p from the selected device
        for (var i = 0; i < this.selectedDevice.ports.length; i++) {
          if (this.selectedDevice.ports[i].id === p.id) {
            this.selectedDevice.ports[i].endpoints.forEach(ep => {
              this.removePortEndpoint(ep);
            });
            this.selectedDevice.ports.splice(i, 1);
          }
        }
        // remove this port from whatever endpoint to which it is connected
      }
      this.updatePortTable();
    });
  }

  getDeviceName() {
    if (this.selectedDevice) {
      return this.selectedDevice.name;
    }
    return "";
  }

  getDeviceFromID(id: number) {
    return this.api.getDeviceByID(id);
  }

  getRoomFromID(id: number) {
    var room = this.api.getRoomByID(id);
    return room.name;
  }

  getModelNameFromID(id: number) {
    var model = this.api.getModelByID(id);
    return model.name;
  }

  getManufacturerFromModelID(id: number) {
    var model = this.api.getModelByID(id);
    return model.manufacturer;
  }

  routeToParentRoom(dev: Device) {
    this.router.navigate(["/room-config/" + dev.roomID]);
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
          deviceID: this.selectedDevice.id,
          portName: port.name,
          connectedDeviceID: conn.device.id,
          connectedPortName: conn.port.name,
        });
          // find other device and add endpoint to that port
        if (conn.port.endpoints.length > 0) this.removePortEndpoint(conn.port.endpoints[0]);
        conn.port.endpoints = [];
        conn.port.endpoints.push({
          deviceID: conn.device.id,
          portName: conn.port.name,
          connectedDeviceID: this.selectedDevice.id,
          connectedPortName: port.name
        })
      }
    });
  }

  removePortEndpoint(e: Endpoint) {
    this.devices.forEach(d => {
      if (d.id === e.connectedDeviceID) {
        d.ports.forEach(p => {
          if (p.name === e.connectedPortName) {
            p.endpoints = [];
          }
        });
      }
    });
  }
}
