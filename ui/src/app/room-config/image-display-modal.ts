import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, ViewChild } from "@angular/core";
import { DeleteModal } from "./delete-modal";
import { NgbCarousel, NgbSlideEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "delete-modal",
    template: `
        <div class="main-container">
          <!-- <img src="{{ imageSource }}"> -->
          <!-- (slide)="onSlide($event)" -->
          <div class="carousel-wrapper">
            <ngb-carousel #carousel="ngbCarousel">
              <ng-template ngbSlide *ngFor="let img of images; index as i" id="{{i}}">
                <div class="picsum-img-wrapper">
                  <img class="room-img" [src]="img" alt="Image {{i + 1}}">
                </div>
              </ng-template>
            </ngb-carousel>
          </div>
          <div class="button-container">
              <button mat-stroked-button (click)="closeModal()">Close</button>
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

        .carousel-wrapper {
          width: 50vw;
        }

        img {
          height: 50vh;
          width: 100%;
          object-fit: cover;
        }

        .button-container {
          padding: 20px 0 0 0;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        button {
          margin-left: 20px;
        }
      `
    ]
  })
export class ImageDisplayModal {
  @ViewChild('carousel') carousel: NgbCarousel | null = null;
  images: string[] = [];
  imageID: string = "";
  currentID: string = "";

  constructor(
    private dialogRef: MatDialogRef<ImageDisplayModal>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {
    this.images = this.data.images;
    this.imageID = this.data.index;
    this.currentID = this.data.index;
  }

  ngAfterViewInit() {
    if (this.carousel) {
      this.carousel.select(this.imageID);
      this.carousel.pause();
    }
  }
  
  closeModal() {
    this.dialogRef.close(false);
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.currentID = slideEvent.current;
  }

  deleteImage() {
    const deleteModal = this.dialog.open(DeleteModal);
    deleteModal.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.dialogRef.close(this.currentID);
      }
    });
  }
} 