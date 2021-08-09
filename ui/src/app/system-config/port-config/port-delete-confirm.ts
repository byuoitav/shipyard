import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-port-delete-confirm',
    template: `
        <h2>Are you sure you want to delete {{ portToDelete }}?</h2>
        <div class="button-container">
            <button mat-stroked-button (click)="onCancel()">Cancel</button>
            <button mat-stroked-button color="warn" (click)="onDelete()">Delete</button>
        </div>
    `,
    styles: [`
        .button-container {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            align-content: flex-end;
        }

        button {
            margin-left: 20px;
        }
    `]
})
export class PortDeleteConfirmComponent implements OnInit {
    portToDelete: string = "";

    constructor(private dialogRef: MatDialogRef<PortDeleteConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) private inputData: any) {
            if (inputData) {
                this.portToDelete = inputData;
            }
        }

    ngOnInit() {}

    onCancel() {
        this.dialogRef.close(false);
    }

    onDelete() {
        this.dialogRef.close(true);
    }
}