import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PortDialogData } from '../ports.component';
import { MatStepper } from '@angular/material/stepper';
import { Port } from '../port-list/port-list.component';

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
  ports: Port[] = []; // temporary

  constructor(private api: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: PortDialogData) {
    this.devices = this.api.getDevices(this.data.RoomID);
    console.log(this.devices);
    this.chosenDevice = this.devices[0];
  }

  ngOnInit(): void {
  }

  test(d: Device) {
    console.log(d);
    this.chosenDevice = d;
    this.stepper.next();
  }

  filterPorts(): Port[] {
    var output = [];
    this.ports.forEach(p => {
      if (p.Device == "") {
        output.push(p);
      }
    });
    return output;
  }

}
