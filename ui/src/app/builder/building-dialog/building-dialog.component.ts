import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-building-dialog',
  templateUrl: './building-dialog.component.html',
  styleUrls: ['./building-dialog.component.scss']
})
export class BuildingDialogComponent implements OnInit {
  ID: string = "";
  tagKey: string = "";
  tagValue: string = "";

  constructor(private dialogRef: MatDialogRef<BuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string) {
      if (data != null) {
        this.ID = this.data;
      }
    }

  ngOnInit(): void {}

  // addTag() {
  //   this.bldg.Tags.set(this.tagKey, this.tagValue);
  //   this.tagKey = "";
  //   this.tagValue = "";
  // }

  // removeTag(key: String) {
  //   this.bldg.Tags.delete(key);
  // }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSave() {
    this.dialogRef.close(this.ID.toString());
  }

  onDelete() {
    this.dialogRef.close(false);
  }

}
