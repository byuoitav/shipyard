import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DeleteModal } from "./delete-modal";

@Component({
    selector: "delete-modal",
    template: `
        <div class="main-container">
          <img src="{{ imageSource }}">
          <div class="button-container">
              <div></div>
              <button mat-raised-button color="warn" (click)="deleteImage()">Delete</button>
          </div>
        </div>
      `,
    styles: [
      `
        .main-container {
          display: flex;
          flex-direction: column;
        }

        img {
          height: 50vh;
        }

        .button-container {
          padding: 20px 0 0 0;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
      `
    ]
  })
export class ImageDisplayModal {
  imageSource: string = "";

  constructor(
    private dialogRef: MatDialogRef<ImageDisplayModal>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {
    this.imageSource = this.data;
  }
  
  cancel() {
    this.dialogRef.close(false);
  }

  deleteImage() {
    const deleteModal = this.dialog.open(DeleteModal);
    deleteModal.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.dialogRef.close(true);
      }
    });
  }
} 