import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { MasterVolume, UIControlGroup, UIDisplay } from 'src/app/services/ui-config';
import { MicrophoneGroupComponent } from '../microphone-group/microphone-group.component';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UiModalComponent implements OnInit {
  devices: Device[] = [];
  deviceTableColumns: string[] = ["select", "id", "type"];

  config: UIControlGroup = new UIControlGroup();
  groupID: string = "";


  CPSelection = new SelectionModel<Device>(true, []);
  DisplaySelection = new SelectionModel<Device>(true, []);
  InputSelection = new SelectionModel<Device>(true, []);
  MasterVolSelection = new SelectionModel<Device>(false, []);

  MicrophoneGroups = new Map<string, string[]>();

  selected: Device[] = [];

  constructor(private uiModal: MatDialogRef<UiModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private api: ApiService,
    private dialog: MatDialog) {
      this.devices = this.api.getDevices("");
      if (this.data.ControlGroup) {
        this.config = data.ControlGroup;
        this.groupID = data.ID;
        this.initializeSelectors();
      }
      this.MasterVolSelection.select(this.devices[0]);
  }

  ngOnInit(): void {
  }
  cancel() {
    this.uiModal.close(null);
  }

  saveControlGroup() {
    this.config.displays = new Map<string, UIDisplay>();
    this.DisplaySelection.selected.forEach(display => {
      this.config.displays.set(display.name, new UIDisplay());
    });
    
    this.config.inputs = [];
    this.InputSelection.selected.forEach(input => {
      this.config.inputs.push(input.name);
    });

    this.config.microphones = this.MicrophoneGroups;

    this.config.masterVolume = new MasterVolume();
    this.config.masterVolume.device = this.MasterVolSelection.selected[0].name;

    this.uiModal.close({
      Config: this.config,
      ID: this.groupID
    });
  }

  confirmSave() {
    // let ref = this.dialog.open(ConfirmConfigComponent, {data: this.groupID});
    // ref.afterClosed().subscribe(data => {
    //   if (data != null) {
    //     this.groupID = data;
    //     this.saveControlGroup();
    //   }
    // });
  }

  initializeSelectors() {
    this.filterDevicesByName([...this.config.displays.keys()]).forEach(dev => {
      this.DisplaySelection.select(dev);
    });
    this.filterDevicesByName(this.config.inputs).forEach(dev => {
      this.InputSelection.select(dev);
    });

    this.MicrophoneGroups = this.config.microphones;

    if (this.config.masterVolume != null) {
      this.filterDevicesByName([this.config.masterVolume.device]).forEach(dev => {
        this.MasterVolSelection.select(dev);
      });
    } else {
      this.MasterVolSelection.select(this.devices[0]);
    }
  }

  addMicGroup() {
    let ref = this.dialog.open(MicrophoneGroupComponent, {width: '50vw', data: this.MicrophoneGroups.size + 1});

    ref.afterClosed().subscribe(group => {
      if (group != null) {
        this.MicrophoneGroups.set(group.ID, group.Microphones);
      }
    });
  }

  deleteMicGroup(id: string) {
    this.MicrophoneGroups.delete(id);
  }

  filterDevicesByName(names: string[]): Device[] {
    var filteredDevs: Device[] = [];
    this.devices.forEach(dev => {
      names.forEach(name => {
        if (name === dev.name) {
          filteredDevs.push(dev);
        }
      });
    });
    return filteredDevs;
  }

  filterDevicesByRegularExpression(pattern: string): Device[] {
    let re = new RegExp(pattern);
    var filteredDevs: Device[] = [];
    this.devices.forEach(dev => {
      if (re.exec(dev.name) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

  checkForCameras(): boolean {
    return false;
  }

}
