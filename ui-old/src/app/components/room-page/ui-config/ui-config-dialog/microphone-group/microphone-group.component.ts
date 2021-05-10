import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Device, ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-microphone-group',
  templateUrl: './microphone-group.component.html',
  styleUrls: ['./microphone-group.component.scss']
})
export class MicrophoneGroupComponent implements OnInit {
  MicSelection = new SelectionModel<Device>(true, []);
  groupID: String;

  devices: Device[];
  deviceTableColumns: string[] = ["select", "id", "type"];


  constructor(private refDialog: MatDialogRef<MicrophoneGroupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private api: ApiService) {
      this.devices = this.api.getDevices("");
  }

  ngOnInit(): void {
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
