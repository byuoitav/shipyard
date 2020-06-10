import { Component, OnInit, Input } from '@angular/core';
import { Device, ApiService, DeviceTypeNode } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DevicesDialogComponent } from '../devices-dialog/devices-dialog.component';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  animations: [
    trigger('rowExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DevicesComponent implements OnInit {
  @Input() roomID: String;
  devices: Device[];

  devicesSource: MatTableDataSource<Device>;
  deviceTableAttributes: String[] = ['id', 'type', 'address', 'description', 'edit'];

  expandedDevice: Device | null;

  menuNodes: DeviceTypeNode[];

  constructor(private api: ApiService,
    private dialogRef: MatDialog) {
    this.devicesSource = new MatTableDataSource();
    this.updateTable();
  }

  ngOnInit(): void {
    this.menuNodes = this.api.getDeviceTypeMenu();
  }

  editDevice(dev: Device) {
    const dialog = this.dialogRef.open(DevicesDialogComponent, {data: dev});

    dialog.afterClosed().subscribe(result => {
      console.log(typeof result);
      if (result instanceof Device) {
        console.log(result);
        this.api.setDevice(result);
      } else if (typeof result == "string") {
        console.log(result);
        this.api.removeDevice(result);
      }
      
      this.updateTable();
    });
  }

  updateTable() {
    this.devices = this.api.getDevices(this.roomID);
    this.devicesSource.data = this.devices;
  }

}
