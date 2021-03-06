import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';


// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListViewComponent } from './list-view/list-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

// Internal
import { CampusListComponent } from './list-view/campuses/campus-list/campus-list.component';
import { CampusViewComponent } from './list-view/campuses/campus-view/campus-view.component';
import { CampusEditComponent } from './list-view/campuses/campus-edit/campus-edit.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingsListComponent } from './buildings/buildings-list/buildings-list.component';
import { BuildingsViewComponent } from './buildings/buildings-view/buildings-view.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsViewComponent } from './rooms/rooms-view/rooms-view.component';
import { SystemsComponent } from './systems/systems.component';
import { SystemsListComponent } from './systems/systems-list/systems-list.component';
import { SystemsViewComponent } from './systems/systems-view/systems-view.component';
import { DevicesComponent } from './devices/devices.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { DevicesViewComponent } from './devices/devices-view/devices-view.component';

// New stuff
import { RoomListComponent } from './room-list/room-list.component';
import { RoomConfigComponent } from './room-config/room-config.component';
import { ImageModalComponent } from './room-config/image-modal/image-modal.component';
import { DeleteModal } from './room-config/delete-modal';
import { ImageDisplayModal } from './room-config/image-display-modal';
import { SystemModalComponent } from './room-config/system-modal/system-modal.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { PortConfigComponent } from './system-config/port-config/port-config.component';
import { UiConfigComponent } from './system-config/ui-config/ui-config.component';
import { PortModalComponent } from './system-config/port-modal/port-modal.component';
import { ConfirmPortDialog } from './system-config/port-modal/confirm-dialog';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { UiModalComponent } from './system-config/ui-modal/ui-modal.component';
import { MicrophoneGroupComponent } from './system-config/microphone-group/microphone-group.component';



@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    CampusListComponent,
    CampusViewComponent,
    CampusEditComponent,
    BuildingsComponent,
    BuildingsListComponent,
    BuildingsViewComponent,
    RoomsComponent,
    RoomsListComponent,
    RoomsViewComponent,
    SystemsComponent,
    SystemsListComponent,
    SystemsViewComponent,
    DevicesComponent,
    DevicesListComponent,
    DevicesViewComponent,

    RoomListComponent,
    RoomConfigComponent,
    ImageModalComponent,
    DeleteModal,
    ImageDisplayModal,
    SystemModalComponent,
    SystemConfigComponent,
    PortConfigComponent,
    UiConfigComponent,
    PortModalComponent,
    ConfirmPortDialog,
    DeviceModalComponent,
    UiModalComponent,
    MicrophoneGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    DragDropModule,

    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatChipsModule,
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
