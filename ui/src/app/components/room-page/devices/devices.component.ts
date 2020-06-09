import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DevicesDialogComponent } from '../devices-dialog/devices-dialog.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  @Input() roomID: String;
  devices: Device[];

  devicesSource: MatTableDataSource<Device>;
  deviceTableAttributes: String[] = ['id', 'type', 'address', 'description', 'edit'];

  constructor(private api: ApiService,
    private dialogRef: MatDialog) {
    this.devicesSource = new MatTableDataSource();
    this.updateTable();
  }

  ngOnInit(): void {}

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
