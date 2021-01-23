import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PortDialogComponent } from '../port-dialog/port-dialog.component';
import { Port } from '../ports.component';

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

    for (var i = 0; i < this.data.Endpoints.length; i++) {
      if (this.data.Endpoints[i].Device === dev) {
        this.data.Endpoints.splice(i, 1);
      }
    }
  }

  connectPort() {
    const ref = this.dialog.open(PortDialogComponent, {
      data: {
        Port: this.data
      },
      width: "50vw"
    });

    ref.afterClosed().subscribe(endpt => {
      if (endpt != null) {
        this.data.Endpoints.push(endpt);
      }
    });
  }

}
