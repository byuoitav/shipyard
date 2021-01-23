import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Device, ApiService} from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PortDialogComponent } from './port-dialog/port-dialog.component';

export class Port {
  ID: String;
  Name: String;
  Endpoints: Endpoint[];
  Incoming: boolean;
  Type: String;
}

export class Endpoint {
  Device: String;
  Port: String;
}

export interface PortDialogData {
  RoomID: String;
  SourceDev: String;
  Port: Port;
}
@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss']
})
export class PortsComponent implements OnInit {
  @Input('roomID') roomID: String;
  devices: Device[];
  currentDevice: Device;
  currentPort: Port;

  constructor(private api: ApiService,
    private dialog: MatDialog) {
    this.devices = this.api.getDevices(this.roomID);
    if (this.devices.length > 0) {
      this.currentDevice = this.devices[0];
    } else {
      this.currentDevice = null;
    }

  }

  ngOnInit(): void {
  }

  setCurrentDevice(dev: Device) {
    this.currentDevice = dev;
  }

  connectPort(p: Port) {
    const ref = this.dialog.open(PortDialogComponent, {
      data: {
        RoomID: this.roomID,
        SourceDev: this.currentDevice.ID,
        Port: p
      },
      width: "50vw"
    });

    ref.afterClosed().subscribe(endpoint => {
      if (endpoint != null) {
        // check if already connected and delete connection
        for(var i = 0; i < p.Endpoints.length; i++) {
          console.log(p.Endpoints[i]);
          this.removePortConnection(p.Endpoints[i]);
        }
        p.Endpoints = [endpoint];
        console.log(p.Endpoints);
      }
    });
  }

  removePortConnection(endpt: Endpoint) {
    console.log(endpt);
    for (var k = 0; k < this.devices.length; k++) {
      if (this.devices[k].ID === endpt.Device) {
        console.log(this.devices[k].ID);
        for (var i = 0; i < this.devices[k].Ports.length; i++) {
          for (var j = 0; j < this.devices[k].Ports[i].Endpoints.length; j++) {
            this.devices[k].Ports[i].Endpoints.splice(j, 1);
            return;
          }
        }
      }
    }
  }
}
