import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';
import { UIControlGroup, UIDisplay, UIInput, UIMicrophoneGroup } from 'src/app/services/ui-config';
import { MicrophoneGroupComponent } from '../microphone-group/microphone-group.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UiModalComponent implements OnInit {
  editLayoutName: boolean = false;

  devices: Device[] = [];
  deviceTableColumns: string[] = ["select", "id", "type"];

  controlGroup: UIControlGroup = new UIControlGroup();


  CPSelection = new SelectionModel<Device>(true, []);


  DisplaySelection = new SelectionModel<Device>(true, []);
  isAllDisplay: boolean = false;
  editDisplay: boolean = false;

  InputSelection = new SelectionModel<Device>(true, []);
  isAllInput: boolean = false;
  editInput: boolean = false;

  MasterVolSelection = new SelectionModel<Device>(false, []);

  MicrophoneGroups: UIMicrophoneGroup[] = [];

  selected: Device[] = [];

  constructor(private uiModal: MatDialogRef<UiModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private api: ApiService,
    private dialog: MatDialog) {
      this.controlGroup.id = Math.floor(Math.random() * 10000); // create a random id until given a proper one

      this.devices = this.api.getDevices(0);
      if (this.data.ControlGroup) {
        this.controlGroup = data.ControlGroup;
        this.controlGroup.displays = this.sortListBySortID(this.controlGroup.displays);
        this.controlGroup.inputs = this.sortListBySortID(this.controlGroup.inputs);
        this.initializeSelectors();
      }

      if (this.controlGroup.name === "") {
        this.controlGroup.name = "New Layout"
      }

      this.MasterVolSelection.select(this.devices[0]);
  }

  ngOnInit(): void {
  }

  drop(e: any, dataList: any[]) {
    moveItemInArray(dataList, e.previousIndex, e.currentIndex);
    this.updateSortIDs(dataList);
  }

  updateSortIDs(list: any[]) {
    let sort = 0;
    list.forEach(item => {
      item.sortID = sort++;
    });
  }

  sortListBySortID(list: any[]) {
    let sorted = [];

    let currentID = 0;
    while(currentID < list.length) {
      for(let i = 0; i < list.length; i++) {
        if (currentID === list[i].sortID) {
          sorted.push(list[i]);
          break;
        }
      }
      currentID++;
    }

    return sorted;
  }

  cancel() {
    this.uiModal.close(null);
  }

  selectAllInputs() {
    if (this.InputSelection.selected.length === this.devices.length && !this.isAllInput) {
      this.InputSelection.clear();
    } else if (this.isAllInput) {
      this.InputSelection.select(...this.devices);
    }
  }

  saveInputs() {
    this.controlGroup.inputs = [];
    this.InputSelection.selected.forEach(input => {
      let uiInput = new UIInput();
      uiInput.deviceID = input.id;
      uiInput.controlGroupID = this.controlGroup.id;
      this.controlGroup.inputs.push(uiInput);
    });
    this.updateSortIDs(this.controlGroup.inputs);

    this.editInput = false;
  }

  selectAllDisplays() {
    if (this.DisplaySelection.selected.length === this.filterDevicesByRegularExpression("-D.*").length && !this.isAllDisplay) {
      this.DisplaySelection.clear();
    } else if (this.isAllDisplay) {
      this.DisplaySelection.select(...this.filterDevicesByRegularExpression("-D.*"));
    }
  }

  saveDisplays() {
    this.controlGroup.displays = [];
    this.DisplaySelection.selected.forEach(display => {
      let uiDisplay = new UIDisplay();
      uiDisplay.deviceID = display.id;
      uiDisplay.controlGroupID = this.controlGroup.id;
      this.controlGroup.displays.push(uiDisplay);
    });
    this.updateSortIDs(this.controlGroup.displays);

    this.editDisplay = false;
  }

  saveControlGroup() {
    this.controlGroup.microphoneGroups = this.MicrophoneGroups;

    this.controlGroup.masterVolumeDeviceID = this.MasterVolSelection.selected[0].id;

    this.uiModal.close(this.controlGroup);
  }

  confirmSave() {
    this.saveControlGroup();
  }

  getDeviceFromID(id: number) {
    var device = this.api.getDeviceByID(id);
    return device.name;
  }

  initializeSelectors() {
    this.filterDevicesByID(this.controlGroup.displays).forEach(dev => {
      this.DisplaySelection.select(dev);
    });
    this.filterDevicesByID(this.controlGroup.inputs).forEach(dev => {
      this.InputSelection.select(dev);
    });

    this.MicrophoneGroups = this.controlGroup.microphoneGroups;

    if (this.controlGroup.masterVolumeDeviceID != 0) {
      this.filterDevicesByID([this.controlGroup.masterVolumeDeviceID]).forEach(dev => {
        this.MasterVolSelection.select(dev);
      });
    } else {
      this.MasterVolSelection.select(this.devices[0]);
    }
  }

  addMicGroup() {
    let ref = this.dialog.open(MicrophoneGroupComponent, {width: '50vw', data: this.MicrophoneGroups.length + 1});

    ref.afterClosed().subscribe(group => {
      if (group != null) {
        let micGroup = new UIMicrophoneGroup();
        micGroup.name = group.ID;
        micGroup.microphones = group.Microphones;
        micGroup.controlGroupID = this.controlGroup.id;
        micGroup.id = this.MicrophoneGroups.length + 1; // Temporary, must change when connected to backend
        
        this.MicrophoneGroups.push(micGroup);
      }
    });
  }

  deleteMicGroup(id: number) {
    // this.MicrophoneGroups.delete(id);
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

  filterDevicesByID(groups: any[]): Device[] {
    var filteredDevs: Device[] = [];
    this.devices.forEach(dev => {
      groups.forEach(id => {
        if (id.deviceID === dev.id) {
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
