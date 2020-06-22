import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';
import { MatStepper } from '@angular/material/stepper';
import { Port } from './port-list/port-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PortDialogComponent } from './port-dialog/port-dialog.component';


export interface PortDialogData {
  RoomID: String;
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
    console.log(p);
    this.dialog.open(PortDialogComponent, {
      data: {
        RoomID: this.roomID,
        Port: p
      }
    })
  }

}
