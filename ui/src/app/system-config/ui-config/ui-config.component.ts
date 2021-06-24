import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { SystemUIConfig, UIControlGroup } from 'src/app/services/ui-config';
import { UiModalComponent } from '../ui-modal/ui-modal.component';

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
    'name',
    'manufacturer',
    'model'
  ];

  constructor(private api: ApiService,
    private dialog: MatDialog) {
    this.roomConf = this.api.getRoomConfig();

    this.updateDeviceTable();
  }

  ngOnInit(): void {
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices("test");
    this.deviceData.data = this.devices;
  }

  addDevice(dev: Device | null) {
    const deviceModal = this.dialog.open(DeviceModalComponent, {data: dev});

    deviceModal.afterClosed().subscribe(resp => {
      
    });
  }

  getRoomFromID(id: number) {
    var room = this.api.getRoomByID(id);
    return room.id;
  }

  getModelNameFromID(id: number) {
    var model = this.api.getModelByID(id);
    return model.name;
  }

  getManufacturerFromModelID(id: number) {
    var model = this.api.getModelByID(id);
    return model.manufacturer;
  }

  getControlPanels(): Device[] {
    let re = new RegExp('-CP.*');
    var filteredDevs: Device[] = [];
    this.devices.forEach(dev => {
      if (re.exec(dev.name) != null) {
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
    const uiModal = this.dialog.open(UiModalComponent, {data: {ControlGroup: group, ID: id}, width: "800px"});

    uiModal.afterClosed().subscribe(resp => {

    });
  }

  checkForCameras(): boolean {
    return false;
  }
}
