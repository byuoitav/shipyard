import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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

// Builder
import { RoomPageComponent } from './builder/room-page/room-page.component';
import { BuildingListComponent } from './builder/building-list/building-list.component';
import { RoomListComponent } from './builder/room-list/room-list.component';
import { BuildingDialogComponent } from './builder/building-dialog/building-dialog.component';
import { RoomDialogComponent } from './builder/room-dialog/room-dialog.component';
import { RoomDevicesComponent } from './builder/room-page/devices/devices.component';
import { DevicesDialogComponent } from './builder/room-page/devices/devices-dialog/devices-dialog.component';
import { DeviceMenuItemComponent } from './builder/room-page/device-menu-item/device-menu-item.component';
import { PortsComponent } from './builder/room-page/ports/ports.component';
import { PortListComponent } from './builder/room-page/ports/port-list/port-list.component';
import { PortDialogComponent } from './builder/room-page/ports/port-dialog/port-dialog.component';
import { ConfirmPortDialog } from './builder/room-page/ports/port-dialog/confirm-dialog';
import { PortConfigComponent } from './builder/room-page/ports/port-config/port-config.component';
import { UiConfigComponent } from './builder/room-page/ui-config/ui-config.component';
import { UIConfigDialogComponent } from './builder/room-page/ui-config/ui-config-dialog/ui-config-dialog.component';
import { ConfirmConfigComponent } from './builder/room-page/ui-config/ui-config-dialog/confirm-config.component';
import { MicrophoneGroupComponent } from './builder/room-page/ui-config/ui-config-dialog/microphone-group/microphone-group.component';
import { CampusesComponent } from './builder/campuses/campuses.component';




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

    RoomPageComponent,
    BuildingListComponent,
    RoomListComponent,
    BuildingDialogComponent,
    RoomDialogComponent,
    RoomDevicesComponent,
    DevicesDialogComponent,
    DeviceMenuItemComponent,
    PortsComponent,
    PortListComponent,
    PortDialogComponent,
    ConfirmPortDialog,
    PortConfigComponent,
    UiConfigComponent,
    UIConfigDialogComponent,
    ConfirmConfigComponent,
    MicrophoneGroupComponent,
    CampusesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
