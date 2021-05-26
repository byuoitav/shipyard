import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { System } from 'src/app/services/system';

@Component({
  selector: 'app-system-modal',
  templateUrl: './system-modal.component.html',
  styleUrls: ['./system-modal.component.scss']
})
export class SystemModalComponent implements OnInit {
  system: System = new System();
  installDate = new FormControl(this.system.installDate);
  checkDate = new FormControl(this.system.checkDate);

  constructor(private dialogRef: MatDialogRef<SystemModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      if (data) {
        this.system.id = data.id;
        this.system.name = data.name;
        this.system.designation = data.designation;
        this.system.installDate = data.installDate;
        this.system.checkDate = data.checkDate;
      }
    }

  ngOnInit(): void {
  }

  onSave() {
    console.log(this.system);
    this.dialogRef.close(this.system);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
