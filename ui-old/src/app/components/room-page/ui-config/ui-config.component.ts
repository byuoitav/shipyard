import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UIConfigDialogComponent } from './ui-config-dialog/ui-config-dialog.component';
import { Device } from '../devices/device';
import { ApiService } from 'src/app/services/api.service';
import { RoomConfig, UIControlGroup } from './ui-config';

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.scss']
})
export class UiConfigComponent implements OnInit {
  @Input('roomID') roomID: String;
  roomConf: RoomConfig;

  devices: Device[];

  constructor(private api: ApiService,
    private dialog: MatDialog) {
    this.roomConf = this.api.getRoomConfig();
    this.devices = this.api.getDevices(this.roomID);
  }

  ngOnInit(): void {
  }

  addGroup(group: UIControlGroup, id: String) {
    var cgDialogRef;
    if (group == null) {
      cgDialogRef = this.dialog.open(UIConfigDialogComponent, {width: '60vw'});
    } else {
      cgDialogRef = this.dialog.open(UIConfigDialogComponent, {width: '60vw', data: {
        ControlGroup: group,
        ID: id
      }});
    }

    cgDialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.roomConf.controlGroups.set(data.ID, data.Config);
        if (id !== data.ID) {
          this.deleteGroup(id);
        }
      }
    });
  }

  deleteGroup(groupID: String) {
    this.roomConf.controlGroups.delete(groupID);
  }

  checkForCameras(): boolean {
    return false;
  }

  getControlPanels(): Device[] {
    let re = new RegExp('-CP.*');
    var filteredDevs = []
    this.devices.forEach(dev => {
      if (re.exec(dev.id.toString()) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

  mapControlPanel(event: any, panel: String, group: String) {
    if (event.source.selected) {
      this.roomConf.controlPanels.set(panel, group);
    }
  }

}
