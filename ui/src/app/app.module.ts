import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { RoomPageComponent } from './components/room-page/room-page.component';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { BuildingDialogComponent } from './components/building-dialog/building-dialog.component';
import { RoomDialogComponent } from './components/room-dialog/room-dialog.component';
import { DevicesComponent } from './components/room-page/devices/devices.component';
import { DevicesDialogComponent } from './components/room-page/devices-dialog/devices-dialog.component';
import { DeviceMenuItemComponent } from './components/room-page/device-menu-item/device-menu-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomPageComponent,
    BuildingListComponent,
    RoomListComponent,
    BuildingDialogComponent,
    RoomDialogComponent,
    DevicesComponent,
    DevicesDialogComponent,
    DeviceMenuItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
