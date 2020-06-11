import { Component, OnInit, Input } from '@angular/core';
import { Device, ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss']
})
export class PortsComponent implements OnInit {
  @Input('roomID') roomID: String;
  devices: Device[];

  constructor(private api: ApiService) {
    this.devices = this.api.getDevices(this.roomID);
  }

  ngOnInit(): void {
  }

  configurePorts(dev: Device) {
    console.log(dev);
  }

}
