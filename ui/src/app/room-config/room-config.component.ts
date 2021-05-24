import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Device } from '../services/device';
import { Room } from '../services/room';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { DeleteModal } from './delete-modal';

@Component({
  selector: 'app-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.scss']
})
export class RoomConfigComponent implements OnInit {
  roomID: string = "";
  room: Room = new Room();

  devices: Device[] = [];

  tagKey: string = "";
  tagValue: string = "";

  description: string = "this is a test of the emergency broadcast system";
  notes: string = "the test will consist of three stages";

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel | null = null;
  images: string[] = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  furniture: Map<string, boolean> = new Map();
  roomTypes: string[] = [];
  roomType: string = '';
  fundingTypes: string[] = [];
  fundingType: string = '';

  systems: any[] = [];

  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.roomID = params["roomID"];
    });
  }

  ngOnInit(): void {
    // this.room = this.route.snapshot.data.room;
    this.room = this.api.getRoom(this.roomID);

    // this.proxy.getRoomDevices(this.roomID).subscribe((data: Device[]) => {
    //   this.devices = data;
    // });
    this.devices = this.api.getDevices(this.roomID);

    this.images = this.getTestImages();
    this.initializeFurnitureList();
    this.roomTypes = this.getRoomTypes();
    this.fundingTypes = this.getFundingTypes();
  }

  addImage() {
    // open image dialog
    const imageDialog = this.dialog.open(ImageModalComponent);
  }

  deleteImage(index: number) {
    console.log("image clicked");
    // open delete dialog
    const deleteModal = this.dialog.open(DeleteModal);
    deleteModal.afterClosed().subscribe(confirm => {
      if (confirm) {
        // delete the image
        this.images.splice(index, 1);
      }
    });
  }

  addTag() {
    this.room.tags.set(this.tagKey, this.tagValue);
    this.tagKey = "";
    this.tagValue = "";
  }

  removeTag(key: string) {
    this.room.tags.delete(key);
  }

  save() {
    // this.proxy.saveRoom(this.room).subscribe(
    //   resp => {
    //       if (resp["success"]) {
    //           console.log(true);
    //       } else {
    //           console.log(false);
    //       }
    //   },
    //   err => {
    //       console.log(err);
    //   }
    // );

  }

  togglePaused() {
    if (this.carousel) {
      if (this.paused) {
        this.carousel.cycle();
      } else {
        this.carousel.pause();
      }
      this.paused = !this.paused;
    }
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
  }

  getTestImages(): string[] {
    let header = "assets/bldgImages/"
    return [
      header + "ASB.jpg",
      header + "BNSN.jpg",
      header + "BYUB.jpg",
      header + "CB.jpg",
      header + "EB.jpg",
      header + "HBLL.jpg",
      header + "HCEB.jpg",
      header + "ITB.jpg",
      header + "JFSB.jpg",
      header + "MCKB.jpg",
      header + "TMCB.jpg",
      header + "WSC.jpg",
    ];
  }

  initializeFurnitureList() {
    if (this.furniture.keys.length == 0) {
      this.furniture.set("Podium", false);
      this.furniture.set("MMC", false);
      this.furniture.set("Ergotron", false);
      this.furniture.set("Ceiling Box", false);
      this.furniture.set("Rack", false);
    }
  }

  getRoomTypes(): string[] {
    return [
      "Type 1",
      "Type 2",
      "Type 3",
      "Type 4",
      "Type 5"
    ];
  }

  getFundingTypes(): string[] {
    return [
      "Type 1",
      "Type 2",
      "Type 3"
    ];
  }
}

