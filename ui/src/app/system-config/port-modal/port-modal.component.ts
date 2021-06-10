import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { Port } from 'src/app/services/port';

@Component({
  selector: 'app-port-modal',
  templateUrl: './port-modal.component.html',
  styleUrls: ['./port-modal.component.scss']
})
export class PortModalComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper | null = null;
  devices: Device[] = [];
  deviceColumns: string[] = [
    "name"
  ];

  ports: Port[] = [];
  portColumns: string[] = [
    "name",
    "connection"
  ];

  constructor(private api: ApiService,
    public dialogRef: MatDialogRef<PortModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.devices = this.api.getDevices("");  //Todo: get the list of devices in the system
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i].id == this.data.deviceID) {
        this.devices.splice(i, 1);
      }
    }
  }

  ngOnInit(): void {
  }

  selectDevice(dev: Device) {
    this.ports = dev.ports;

    if (this.stepper) this.stepper.next();
  }

  connectPort(port: Port) {
    // confirm

    this.dialogRef.close(port);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
