import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Device, ApiService, Port } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ConfirmPortDialog, ConfirmData } from './confirm-dialog';

@Component({
  selector: 'app-port-dialog',
  templateUrl: './port-dialog.component.html',
  styleUrls: ['./port-dialog.component.scss']
})
export class PortDialogComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  devices: Device[];
  deviceTableHeaders: string[] =  ["id", "type"];
  portTableHeaders: string[] = ["id"];

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

  test(d: Device) {
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
        p.Endpoint = [this.data.SourceDev];
        this.refDialog.close(this.chosenDevice.ID);
      }
    });
  }

  cancel() {
    this.refDialog.close(null);
  }
}
