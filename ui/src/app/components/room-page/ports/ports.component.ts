import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Device, ApiService, Port } from 'src/app/services/api.service';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { PortDialogComponent } from './port-dialog/port-dialog.component';


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
  @ViewChild('stepper') stepper: MatStepper;
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

  configurePorts(dev: Device) {
    this.currentDevice = dev;
    this.stepper.next();
  }

  setCurrentDevice(dev: Device) {
    this.currentDevice = dev;
  }

  test(p: Port) {
    const ref = this.dialog.open(PortDialogComponent, {
      data: {
        RoomID: this.roomID,
        SourceDev: this.currentDevice.ID,
        Port: p
      },
      width: "50vw"
    });

    ref.afterClosed().subscribe(chosenDev => {
      if (chosenDev != null) {
        p.Endpoint = [chosenDev];
      }
    });
  }

  test2(data: any) {
    for (var k = 0; k < this.devices.length; k++) {
      if (this.devices[k].ID === data.device) {
        for (var i = 0; i < this.devices[k].Ports.length; i++) {
          for (var j = 0; j < this.devices[k].Ports[i].Endpoint.length; j++) {
            if (data.port === this.devices[k].Ports[i].Endpoint[j]) {
              this.devices[k].Ports[i].Endpoint.splice(j, 1);
              return;
            }
          }
        }
      }
    }
  }

}
