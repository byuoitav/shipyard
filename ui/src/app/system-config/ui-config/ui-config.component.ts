import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { SystemUIConfig, UIControlGroup } from 'src/app/services/ui-config';

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.scss']
})
export class UiConfigComponent implements OnInit {
  roomConf: SystemUIConfig = new SystemUIConfig();

  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name'
  ];

  constructor(private api: ApiService) {
    this.roomConf = this.api.getRoomConfig();

    this.updateDeviceTable();
  }

  ngOnInit(): void {
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices("test");
    this.deviceData.data = this.devices;
  }

  getControlPanels(): Device[] {
    let re = new RegExp('-CP.*');
    var filteredDevs: Device[] = [];
    this.devices.forEach(dev => {
      if (re.exec(dev.id) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

  mapControlPanel(event: any, panel: string, group: string) {
    if (event.source.selected) {
      this.roomConf.controlPanels.set(panel, group);
    }
  }

  addGroup(group: UIControlGroup | null, id: string) {

  }

  checkForCameras(): boolean {
    return false;
  }
}
