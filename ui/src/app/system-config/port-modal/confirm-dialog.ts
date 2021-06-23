import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "confirm-port",
    template: `
        <h1>Connect {{ data.path }}?</h1>
        <div class="button-container">
            <button mat-stroked-button color="warn" (click)="cancel()">Cancel</button>
            <button mat-stroked-button color="primary" (click)="confirm()">Confirm</button>
        </div>
      `,
    styles: [
      `
        .button-container {
            display: flex;
            justify-content: space-evenly;
        }
      `
    ]
  })
export class ConfirmPortDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmPortDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    
    cancel() {
        this.dialogRef.close(false);
    }

    confirm() {
        this.dialogRef.close(true);
    }
} 