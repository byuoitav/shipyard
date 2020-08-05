import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ui-config-dialog',
    template: `
        <h1 mat-dialog-title>Confirm Control Group Title</h1>

        <mat-form-field>
            <mat-label>Title</mat-label>
            <input matInput type="text" [(ngModel)]="id">
        </mat-form-field>
        <button mat-stroked-button color="primary" (click)="saveGroupID()">Done</button>
        <button mat-stroked-button color="warn" (click)="cancel()">Cancel</button>
    `
  })
  export class ConfirmConfigComponent implements OnInit {
    id: String;

    constructor(private refDialog: MatDialogRef<ConfirmConfigComponent>,
        @Inject(MAT_DIALOG_DATA) private data: String) {
            this.id = this.data;
        }
    
    ngOnInit(): void {
    }

    saveGroupID() {
        this.refDialog.close(this.id);
    }

    cancel() {
        this.refDialog.close(null);
    }
}