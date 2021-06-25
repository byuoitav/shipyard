import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Device } from 'src/app/services/device';

@Component({
  selector: 'app-microphone-group',
  templateUrl: './microphone-group.component.html',
  styleUrls: ['./microphone-group.component.scss']
})
export class MicrophoneGroupComponent implements OnInit {
  MicSelection = new SelectionModel<string>(true, []);
  groupID: string = '';

  devices: Device[] = [];
  deviceTableColumns: string[] = ["select", "id", "type"];


  constructor(private refDialog: MatDialogRef<MicrophoneGroupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private api: ApiService) {
      this.devices = this.api.getDevices(0);
      console.log(this.data);
      if (this.data) this.groupID = "Group " + this.data;
      else this.groupID = "Group 1";
  }

  ngOnInit(): void {
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

  cancel() {
    this.refDialog.close(null);
  }

  saveGroup() {
    this.refDialog.close({
      ID: this.groupID,
      Microphones: this.MicSelection.selected
    });
  }

}
