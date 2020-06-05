import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Building } from 'src/app/services/api.service';

@Component({
  selector: 'app-building-dialog',
  templateUrl: './building-dialog.component.html',
  styleUrls: ['./building-dialog.component.scss']
})
export class BuildingDialogComponent implements OnInit {
  bldg: Building;
  tagKey: String;
  tagValue: String;
  newBldg: boolean;

  constructor(private dialogRef: MatDialogRef<BuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Building) {
      if (data != null) {
        this.bldg = data;
        this.newBldg = false;
      } else {
        this.bldg = {
          ID: "",
          Tags: new Map()
        };
        this.newBldg = true;
      }
    }

  ngOnInit(): void {}

  addTag() {
    this.bldg.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    this.bldg.Tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.bldg);
  }

  onDelete() {
    this.dialogRef.close("delete");
  }

}
