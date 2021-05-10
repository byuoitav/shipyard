import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Device, ApiService, UIControlGroup, UIDisplay, MasterVolume } from 'src/app/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmConfigComponent } from './confirm-config.component';
import { MicrophoneGroupComponent } from './microphone-group/microphone-group.component';

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
    }

  ngOnInit(): void {
  }

  cancel() {
    this.refDialog.close(null);
  }

  saveControlGroup() {
    this.config.Displays = new Map<String, UIDisplay>();
    this.DisplaySelection.selected.forEach(display => {
      this.config.Displays.set(display.ID, new UIDisplay());
    });
    
    this.config.Inputs = [];
    this.InputSelection.selected.forEach(input => {
      this.config.Inputs.push(input.ID);
    });

    this.config.Microphones = this.MicrophoneGroups;

    this.config.MasterVolume = new MasterVolume();
    this.config.MasterVolume.Device = this.MasterVolSelection.selected[0].ID;

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
    this.filterDevicesByID([...this.config.Displays.keys()]).forEach(dev => {
      this.DisplaySelection.select(dev);
    });
    this.filterDevicesByID(this.config.Inputs).forEach(dev => {
      this.InputSelection.select(dev);
    });

    this.MicrophoneGroups = this.config.Microphones;

    if (this.config.MasterVolume != null) {
      this.filterDevicesByID([this.config.MasterVolume.Device]).forEach(dev => {
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
        if (id === dev.ID) {
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
      if (re.exec(dev.ID.toString()) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

  checkForCameras(): boolean {
    return false;
  }

}
