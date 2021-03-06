import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  url: string = "";
  upload: boolean = false;

  constructor(private dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.upload = this.data;
    }

  ngOnInit(): void {
  }


  onUploadFile(event: any) {
    console.log("uploaded");
  }
}
