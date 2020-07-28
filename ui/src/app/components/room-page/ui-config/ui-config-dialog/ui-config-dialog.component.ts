import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Device, ApiService, UIControlGroup } from 'src/app/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-ui-config-dialog',
  templateUrl: './ui-config-dialog.component.html',
  styleUrls: ['./ui-config-dialog.component.scss']
})
export class UIConfigDialogComponent implements OnInit {
  config: UIControlGroup = new UIControlGroup;

  devices: Device[];
  deviceTableColumns: string[] = ["select", "id", "type"];
  CPSelection = new SelectionModel<Device>(true, []);
  DisplaySelection = new SelectionModel<Device>(true, []);
  InputSelection = new SelectionModel<Device>(true, []);
  MasterVolSelection = new SelectionModel<Device>(false, []);

  selected: Device[] = [];

  constructor(private refDialog: MatDialogRef<UIConfigDialogComponent>,
    private api: ApiService) {
      this.devices = this.api.getDevices("");
    }

  ngOnInit(): void {
  }

  cancel() {
    this.refDialog.close();
  }

  filterControlPanels(): Device[] {
    let re = new RegExp('-CP.');
    var filteredDevs = []
    this.devices.forEach(dev => {
      if (re.exec(dev.ID.toString()) != null) {
        filteredDevs.push(dev);
      }
    });

    return filteredDevs;
  }

}
