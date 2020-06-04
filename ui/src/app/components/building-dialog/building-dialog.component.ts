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

  constructor(private dialogRef: MatDialogRef<BuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: String) { }

  ngOnInit(): void {
    this.bldg = {
      ID: "",
      Tags: new Map()
    };
  }

  addTag() {
    this.bldg.Tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: String) {
    console.log(key);
    this.bldg.Tags.delete(key);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    console.log("save new building");
    this.dialogRef.close(this.bldg);
  }

}
