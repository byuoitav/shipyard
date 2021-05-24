import { Component, OnInit, Input } from '@angular/core';
import { ApiService} from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PortDialogComponent } from './port-dialog/port-dialog.component';
import { Device } from '../devices/device';
import { Endpoint, Port } from './port';
import { ApiProxyService } from 'src/app/services/api-proxy.service';

export interface PortDialogData {
  RoomID: string;
  SourceDev: string;
  Port: Port;
}
@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss']
})
export class PortsComponent implements OnInit {
  @Input('roomID') roomID: string = "";
  @Input('devices-test') devices: Device[] = [];
  // devices: Device[];
  currentDevice: Device = new Device();
  currentPort: Port = new Port();

  constructor(private proxy: ApiProxyService,
    private api: ApiService,
    private dialog: MatDialog) {
    // this.devices = this.api.getDevices(this.roomID);
  }

  ngOnInit(): void {
    // this.proxy.getRoomDevices(this.roomID).subscribe((data: Device[]) => {
    //   this.devices = data;
    //   if (this.devices.length > 0) {
    //     this.currentDevice = this.devices[0];
    //   }
    // });
    if (this.devices.length > 0) {
      this.currentDevice = this.devices[0];
    }
  }

  setCurrentDevice(dev: Device) {
    this.currentDevice = dev;
  }

  connectPort(p: Port) {
    const ref = this.dialog.open(PortDialogComponent, {
      data: {
        RoomID: this.roomID,
        SourceDev: this.currentDevice.id,
        Port: p
      },
      width: "50vw"
    });

    ref.afterClosed().subscribe(endpoint => {
      if (endpoint != null) {
        // check if already connected and delete connection
        for(var i = 0; i < p.endpoints.length; i++) {
          console.log(p.endpoints[i]);
          this.removePortConnection(p.endpoints[i]);
        }
        p.endpoints = [endpoint];
        console.log(p.endpoints);
      }
    });
  }

  removePortConnection(endpt: Endpoint) {
    console.log(endpt);
    for (var k = 0; k < this.devices.length; k++) {
      if (this.devices[k].id === endpt.device) {
        console.log(this.devices[k].id);
        for (var i = 0; i < this.devices[k].ports.length; i++) {
          for (var j = 0; j < this.devices[k].ports[i].endpoints.length; j++) {
            this.devices[k].ports[i].endpoints.splice(j, 1);
            return;
          }
        }
      }
    }
  }
}
