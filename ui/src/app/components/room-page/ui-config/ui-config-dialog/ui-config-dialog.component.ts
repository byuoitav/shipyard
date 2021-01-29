import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmConfigComponent } from './confirm-config.component';
import { MicrophoneGroupComponent } from './microphone-group/microphone-group.component';
import { Device } from '../../devices/device';
import { MasterVolume, UIControlGroup, UIDisplay } from '../ui-config';

@Component({
  selector: 'app-ui-config-dialog',
  templateUrl: './ui-config-dialog.component.html',
  styleUrls: ['./ui-config-dialog.component.scss']
})
export class UIConfigDialogComponent implements OnInit {
  config: UIControlGroup;
  groupID: String;

  devices: Device[];
  deviceTableColumns: string[] = ["select", "id", "type"];
  CPSelection = new SelectionModel<Device>(true, []);
  DisplaySelection = new SelectionModel<Device>(true, []);
  InputSelection = new SelectionModel<Device>(true, []);
  MasterVolSelection = new SelectionModel<Device>(false, []);

  MicrophoneGroups = new Map<String, String[]>();

  selected: Device[] = [];

  constructor(private refDialog: MatDialogRef<UIConfigDialogComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog) {
      this.devices = this.api.getDevices("");
      if (this.data == null) {
        this.config = new UIControlGroup();
        this.groupID = "";
      } else {
        this.config = data.ControlGroup;
        this.groupID = data.ID;
        this.initializeSelectors();
      }
      this.MasterVolSelection.select(this.devices[0]);
    }

  ngOnInit(): void {
  }

  cancel() {
    this.refDialog.close(null);
  }

  saveControlGroup() {
    this.config.displays = new Map<String, UIDisplay>();
    this.DisplaySelection.selected.forEach(display => {
      this.config.displays.set(display.id, new UIDisplay());
    });
    
    this.config.inputs = [];
    this.InputSelection.selected.forEach(input => {
      this.config.inputs.push(input.id);
    });

    this.config.microphones = this.MicrophoneGroups;

    this.config.masterVolume = new MasterVolume();
    this.config.masterVolume.device = this.MasterVolSelection.selected[0].id;

    this.refDialog.close({
      Config: this.config,
      ID: this.groupID
    });
  }

  confirmSave() {
    let ref = this.dialog.open(ConfirmConfigComponent, {data: this.groupID});
    ref.afterClosed().subscribe(data => {
      if (data != null) {
        this.groupID = data;
        this.saveControlGroup();
      }
    });
  }

  initializeSelectors() {
    this.filterDevicesByID([...this.config.displays.keys()]).forEach(dev => {
      this.DisplaySelection.select(dev);
    });
    this.filterDevicesByID(this.config.inputs).forEach(dev => {
      this.InputSelection.select(dev);
    });

    this.MicrophoneGroups = this.config.microphones;

    if (this.config.masterVolume != null) {
      this.filterDevicesByID([this.config.masterVolume.device]).forEach(dev => {
        this.MasterVolSelection.select(dev);
      });
    } else {
      this.MasterVolSelection.select(this.devices[0]);
    }
  }

  addMicGroup() {
    let ref = this.dialog.open(MicrophoneGroupComponent, {width: '50vw'});

    ref.afterClosed().subscribe(group => {
      if (group != null) {
        this.MicrophoneGroups.set(group.ID, group.Microphones);
      }
    });
  }

  deleteMicGroup(id: String) {
    this.MicrophoneGroups.delete(id);
  }

  filterDevicesByID(ids: String[]): Device[] {
    var filteredDevs = []
    this.devices.forEach(dev => {
      ids.forEach(id => {
        if (id === dev.id) {
          filteredDevs.push(dev);
        }
      });
    });
    return filteredDevs;
  }

  filterDevicesByRegularExpression(pattern: string): Device[] {
    let re = new RegExp(pattern);
    var filteredDevs = []
    this.devices.forEach(dev => {
      if (re.exec(dev.id.toString()) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

  checkForCameras(): boolean {
    return false;
  }

}
