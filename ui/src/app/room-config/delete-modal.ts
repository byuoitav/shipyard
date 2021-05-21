import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
    selector: "delete-modal",
    template: `
        <h2>Delete this image?</h2>
        <div class="button-container">
            <button mat-stroked-button (click)="cancel()">Cancel</button>
            <button mat-raised-button color="warn" (click)="deleteImage()">Delete</button>
        </div>
      `,
    styles: [
      `
        .button-container {
            display: flex;
            justify-content: space-evenly;
            width: 300px;
        }
      `
    ]
  })
export class DeleteModal {
    constructor(
        public dialogRef: MatDialogRef<DeleteModal>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    
    cancel() {
        this.dialogRef.close(false);
    }

    deleteImage() {
        this.dialogRef.close(true);
    }
} 