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
  @ViewChild('stepper') stepper: MatStepper;
  devices: Device[];
  deviceTableHeaders: string[] =  ["id", "type"];
  portTableHeaders: string[] = ["id", "connection"];

  chosenDevice: Device;

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
    this.stepper.next();
  }

  filterPorts(): Port[] {
    var output = [];
    this.chosenDevice.Ports.forEach(p => {
      if (p.Incoming != this.data.Port.Incoming) {
        output.push(p);
      }
    });
    return output;
  }

  confirmSelection(p: Port) {
    let data = new ConfirmData;
    if (p.Incoming) {
      data.Incoming = this.chosenDevice.ID;
      data.IncomingPort = p.Name;
      data.Outgoing = this.data.SourceDev;
      data.OutgoingPort = this.data.Port.Name;
    } else {
      data.Incoming = this.data.SourceDev;
      data.IncomingPort = this.data.Port.Name;
      data.Outgoing = this.chosenDevice.ID;
      data.OutgoingPort = p.Name;
    }

    const ref = this.dialog.open(ConfirmPortDialog, {data: data});

    ref.afterClosed().subscribe(confirm => {
      if (confirm) {
        p.Endpoints = [
          {
            Device: this.data.SourceDev,
            Port: this.data.Port.Name
          }
        ];
        this.refDialog.close({
          Device: this.chosenDevice.ID,
          Port: p.Name
        });
      }
    });
  }

  cancel() {
    this.refDialog.close(null);
  }

  isConnected(p: Port): boolean {
    let test = (p.Endpoints != null && p.Endpoints.length > 0);
    return test;
  }
}
