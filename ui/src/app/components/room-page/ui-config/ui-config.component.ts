import { Component, OnInit, Input } from '@angular/core';
import { UIControlGroup, ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UIConfigDialogComponent } from './ui-config-dialog/ui-config-dialog.component';

@Component({
  selector: 'app-ui-config',
  templateUrl: './ui-config.component.html',
  styleUrls: ['./ui-config.component.scss']
})
export class UiConfigComponent implements OnInit {
  @Input('roomID') roomID: String;

  controlGroups: UIControlGroup[];

  constructor(private api: ApiService,
    private dialog: MatDialog) {
    this.controlGroups = this.api.getControlGroups();
  }

  ngOnInit(): void {
  }

  addGroup() {
    this.dialog.open(UIConfigDialogComponent, {width: '60vw'});
  }

}
