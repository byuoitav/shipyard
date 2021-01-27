import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DevicesDialogComponent } from './devices-dialog/devices-dialog.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Device } from './device';
import { DeviceTypeNode } from './device-type-menu';

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
  @Input() expandable: boolean;
  @Output() currentDev: EventEmitter<any> = new EventEmitter();

  devices: Device[];

  devicesSource: MatTableDataSource<Device>;
  deviceTableAttributes: String[] = ['id', 'address', 'description'];

  expandedDevice: Device | null;
  highlightedDevice: Device | null;

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
      if (result != null) {
        if (result) {
          this.api.addDevice(dev);
        } else {
          this.api.removeDevice(dev.id);
        }
      }
      this.updateTable();
    });
  }

  updateTable() {
    this.devices = this.api.getDevices(this.roomID);
    this.devicesSource.data = this.devices;
  }

  createDevice(devType: String) {
    var dev = new Device(null);
    dev.Type = devType;

    this.editDevice(dev);
  }

  test(device: Device) {
    if (this.expandable) {
      this.expandedDevice = this.expandedDevice === device ? null : device;
    } else {
      this.highlightedDevice = this.highlightedDevice === device ? null : device;
    }
    this.currentDev.emit(device);
  }

}
