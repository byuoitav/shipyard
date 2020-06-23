import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PortDialogData } from '../ports.component';
import { MatStepper } from '@angular/material/stepper';
import { Port } from '../port-list/port-list.component';
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
    @Inject(MAT_DIALOG_DATA) private data: PortDialogData) {
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
    this.ports.forEach(p => {
      if (p.Device == "" && p.Incoming != this.data.Port.Incoming) {
        output.push(p);
      }
    });
    return output;
  }

  confirmSelection(p: Port) {
    let data = new ConfirmData;
    if (p.Incoming) {
      data.Incoming = this.chosenDevice.ID;
      data.IncomingPort = p.ID;
      data.Outgoing = this.data.SourceDev;
      data.OutgoingPort = this.data.Port.ID;
    } else {
      data.Incoming = this.data.SourceDev;
      data.IncomingPort = this.data.Port.ID;
      data.Outgoing = this.chosenDevice.ID;
      data.OutgoingPort = p.ID;
    }

    const ref = this.dialog.open(ConfirmPortDialog, {data: data});

    ref.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.refDialog.close(this.data.SourceDev);
      }
    });
  }

  cancel() {
    this.refDialog.close(null);
  }

  ports: Port[] = [  // temporary
    {
      ID: '1',
      Device: '',
      Incoming: true
    },
    {
      ID: '2',
      Device: '',
      Incoming: true
    },
    {
      ID: '3',
      Device: '',
      Incoming: true
    },
    {
      ID: '4',
      Device: 'test',
      Incoming: true
    },
    {
      ID: '5',
      Device: 'test',
      Incoming: true
    },
    {
      ID: '6',
      Device: 'test',
      Incoming: false
    },
    {
      ID: '7',
      Device: '',
      Incoming: false
    },
    {
      ID: '8',
      Device: 'test',
      Incoming: false
    },
    {
      ID: '9',
      Device: '',
      Incoming: false
    }
  ];

}
