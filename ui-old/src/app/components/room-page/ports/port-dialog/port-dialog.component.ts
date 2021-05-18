import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ConfirmPortDialog, ConfirmData } from './confirm-dialog';
import { Device } from '../../devices/device';
import { Port } from '../port';

@Component({
  selector: 'app-port-dialog',
  templateUrl: './port-dialog.component.html',
  styleUrls: ['./port-dialog.component.scss']
})
export class PortDialogComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper | null = null;
  devices: Device[] = [];
  deviceTableHeaders: string[] =  ["id", "type"];
  portTableHeaders: string[] = ["id", "connection"];

  chosenDevice: Device = new Device();

  constructor(private api: ApiService,
    private dialog: MatDialog,
    private refDialog: MatDialogRef<PortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.devices = this.api.getDevices(this.data.RoomID);
    this.chosenDevice = this.devices[0];
  }

  ngOnInit(): void {
  }

  chooseDevice(d: Device) {
    this.chosenDevice = d;
    if (this.stepper) {
      this.stepper.next();
    }
  }

  filterPorts(): Port[] {
    var output: Port[] = [];
    this.chosenDevice.ports.forEach(p => {
      if (p.incoming != this.data.Port.incoming) {
        output.push(p);
      }
    });
    return output;
  }

  confirmSelection(p: Port) {
    var confirmData: ConfirmData = new ConfirmData();
    if (p.incoming) {
      confirmData.Incoming = this.chosenDevice.id;
      confirmData.IncomingPort = p.name;
      confirmData.Outgoing = this.data.SourceDev;
      confirmData.OutgoingPort = this.data.Port.name;
    } else {
      confirmData.Incoming = this.data.SourceDev;
      confirmData.IncomingPort = this.data.Port.name;
      confirmData.Outgoing = this.chosenDevice.id;
      confirmData.OutgoingPort = p.name;
    }

    const ref = this.dialog.open(ConfirmPortDialog, {data: confirmData});

    ref.afterClosed().subscribe(confirm => {
      if (confirm) {
        p.endpoints = [
          {
            device: this.data.SourceDev,
            port: this.data.Port.name
          }
        ];
        this.refDialog.close({
          device: this.chosenDevice.id,
          port: p.name
        });
      }
    });
  }

  cancel() {
    this.refDialog.close(null);
  }

  isConnected(p: Port): boolean {
    let test = (p.endpoints != null && p.endpoints.length > 0);
    return test;
  }
}
