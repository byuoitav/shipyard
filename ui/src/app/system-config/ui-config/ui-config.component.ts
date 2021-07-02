import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { SystemUIConfig, UIControlGroup, UIControlPanel } from 'src/app/services/ui-config';
import { UiModalComponent } from '../ui-modal/ui-modal.component';

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.scss'],
  animations: [
    trigger('rowExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', padding: '10px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UiConfigComponent implements OnInit {
  controlGroups: UIControlGroup[] = [];

  controlGroupsTableData: MatTableDataSource<UIControlGroup> = new MatTableDataSource();
  deviceData: MatTableDataSource<Device> = new MatTableDataSource();
  devices: Device[] = [];
  deviceColumns: string[] = [
    'name',
    'manufacturer',
    'model',
    'systems'
  ];

  layoutColumns: string[] = [
    'layouts'
  ];

  expandedLayout: UIControlGroup | null = null;

  constructor(private api: ApiService,
    private dialog: MatDialog,
    private router: Router) {
    this.controlGroups = this.api.getControlGroups(0);
    this.controlGroupsTableData.data = this.controlGroups;

    this.updateDeviceTable();
  }

  ngOnInit(): void {}

  selectLayout(l: UIControlGroup) {
    this.expandedLayout = this.expandedLayout === l ? null : l;
  }

  updateDeviceTable() {
    this.devices = this.api.getDevices(0);
    this.deviceData.data = this.devices;
  }

  addDevice(dev: Device | null, tabOver: boolean) {
    const deviceModal = this.dialog.open(DeviceModalComponent, { data: {
      device: dev,
      tab: tabOver
    } });

    deviceModal.afterClosed().subscribe(resp => {

    });
  }

  getRoomFromID(id: number) {
    var room = this.api.getRoomByID(id);
    return room.name;
  }

  getDeviceFromID(id: number) {
    var device = this.api.getDeviceByID(id);
    return device.name;
  }

  getModelNameFromID(id: number) {
    var model = this.api.getModelByID(id);
    return model.name;
  }

  getManufacturerFromModelID(id: number) {
    var model = this.api.getModelByID(id);
    return model.manufacturer;
  }
  
  routeToParentRoom(dev: Device) {
    this.router.navigate(["/room-config/" + dev.roomID]);
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

  mapControlPanel(event: any, panel: Device, group: UIControlGroup) {
    if (event.source.selected) {
      // Todo: check if the control panel is already connected somewhere else, or if it is already in the list

      let controlPanel = new UIControlPanel();
      controlPanel.deviceID = panel.id;
      controlPanel.controlGroupID = group.id;
      controlPanel.UIType = "Fruit";

      group.controlPanels.push(controlPanel);
    }
  }

  addGroup(group: UIControlGroup | null) {
    const uiModal = this.dialog.open(UiModalComponent, {data: {ControlGroup: group}, width: "800px"});

    uiModal.afterClosed().subscribe(resp => {
      if (resp) {

        // check if control group already exists
        for (var i = 0; i < this.controlGroups.length; i++) {
          if (this.controlGroups[i].id === resp.id){
            this.controlGroups[i] = resp;
            return;
          }
        }

        this.controlGroups.push(resp);
        this.controlGroupsTableData.data = this.controlGroups;
      }
    });
  }

  checkForCameras(): boolean {
    return false;
  }
}
