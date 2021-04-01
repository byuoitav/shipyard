import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DevicesDialogComponent } from './devices-dialog/devices-dialog.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Device } from './device';
import { DeviceTypeNode } from './device-type-menu';
import { ApiProxyService } from 'src/app/services/api-proxy.service';

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
  @Input() roomID: String = "";
  @Input() expandable: boolean;
  @Output() currentDev: EventEmitter<any> = new EventEmitter();

  devices: Device[];

  devicesSource: MatTableDataSource<Device>;
  deviceTableAttributes: String[] = ['id', 'type', 'address'];

  expandedDevice: Device | null;
  highlightedDevice: Device | null;

  menuNodes: DeviceTypeNode[];

  constructor(private proxy: ApiProxyService,
    private dialogRef: MatDialog) {
    this.devicesSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.proxy.getDeviceMenu().subscribe((data: DeviceTypeNode[]) => {
      this.menuNodes = data;
    });
    this.updateTable();
  }

  editDevice(dev: Device) {
    const dialog = this.dialogRef.open(DevicesDialogComponent, {data: dev});

    dialog.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.proxy.saveDevice(dev);
        } else {
          //Todo: delete device?
        }
      }
      this.updateTable();
    });
  }

  updateTable() {
    this.proxy.getRoomDevices(this.roomID).subscribe((data: Device[]) => {
      this.devices = data;
      this.createMaps(this.devices);
      this.devicesSource.data = this.devices;
    });
  }

  createMaps(devices: Device[]) {
    devices.forEach(dev => {
      let map = new Map<string, string>();
      let jsonMap = dev.tags;
      for (var val in jsonMap) {
        map.set(val, jsonMap[val]);
      }
      dev.tags = map;
    });
  }

  createDevice(devType: String) {
    var dev = new Device(null);
    dev.Type = devType;

    this.editDevice(dev);
  }

  expandRow(device: Device) {
    if (this.expandable) {
      this.expandedDevice = this.expandedDevice === device ? null : device;
    } else {
      this.highlightedDevice = this.highlightedDevice === device ? null : device;
    }
    this.currentDev.emit(device);
  }

}
