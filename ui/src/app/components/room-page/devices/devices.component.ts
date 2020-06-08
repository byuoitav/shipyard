import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnChanges {
  @Input() roomID: String;
  devices: Device[];

  devicesSource: MatTableDataSource<Device>;
  deviceTableAttributes: String[] = ['id', 'type', 'address'];

  constructor(private api: ApiService) {
    this.devices = this.api.getDevices(this.roomID);
    this.devicesSource = new MatTableDataSource(this.devices);
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.devicesSource = new MatTableDataSource(this.devices);
  }

}
