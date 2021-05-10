import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Port } from 'src/app/services/api.service';
import { PortDialogComponent } from '../port-dialog/port-dialog.component';

@Component({
  selector: 'app-port-config',
  templateUrl: './port-config.component.html',
  styleUrls: ['./port-config.component.scss']
})
export class PortConfigComponent implements OnInit {
  @Output() onDelete = new EventEmitter<any>();
  removable = true;

  constructor(private refDialog: MatDialogRef<PortConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Port,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.refDialog.close(false);
  }

  onSave() {
    this.refDialog.close(true);
  }

  onRemove(dev: String) {
    this.onDelete.emit({
      delete: dev
    });

    for (var i = 0; i < this.data.Endpoint.length; i++) {
      if (this.data.Endpoint[i] === dev) {
        this.data.Endpoint.splice(i, 1);
      }
    }
  }

  test() {
    const ref = this.dialog.open(PortDialogComponent, {
      data: {
        // RoomID: this.roomID,
        // SourceDev: this.currentDevice.ID,
        Port: this.data
      }
    });

    ref.afterClosed().subscribe(chosenDev => {
      if (chosenDev != null) {
        this.data.Endpoint.push(chosenDev);
      }
    });
  }

}
