import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { Port } from 'src/app/services/port';
import { ConfirmPortDialog } from './confirm-dialog';

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
  selectedDevice: Device = new Device();

  ports: Port[] = [];
  portColumns: string[] = [
    "name",
    "connection"
  ];

  constructor(private api: ApiService,
    public dialogRef: MatDialogRef<PortModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.devices = this.api.getDevices(0);  //Todo: get the list of devices in the system
  }

  filterDevices() {
    var filtered = [];
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i].id != this.data.device.id) {
        filtered.push(this.devices[i]);
      }
    }
    return filtered;
  }

  selectDevice(dev: Device) {
    this.selectedDevice = dev;
    this.ports = this.filterPorts(dev.ports, this.data.port.direction);

    if (this.stepper) this.stepper.next();
  }

  getDeviceNameFromID(id: number) {
    return this.api.getDeviceByID(id).name;
  }

  filterPorts(ports: Port[], type: string) {
    var filtered = [];
    for (var i = 0; i < ports.length; i++) {
      if (ports[i].direction != type) {
        filtered.push(ports[i]);
      }
    }
    return filtered;
  }

  connectPort(port: Port) {
    // confirm
    const confirmDialogRef = this.dialog.open(ConfirmPortDialog, {data: {
      path: this.data.device.name + " : " + this.data.port.name + " to " + this.selectedDevice.name + " : " + port.name
    }});

    confirmDialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.dialogRef.close({
          device: this.selectedDevice,
          port: port
        });
      }
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
