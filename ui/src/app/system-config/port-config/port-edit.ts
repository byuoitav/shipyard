import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Port } from 'src/app/services/port';

@Component({
    selector: 'app-port-edit',
    template: `
        <h2>Edit Port</h2>
        <mat-dialog-content class="system-container">
            <div class="main-container">
                <mat-grid-list cols="2" rowHeight="70px">
                    <mat-grid-tile>
                        <mat-form-field>
                            <mat-label>Name</mat-label>
                            <input matInput [(ngModel)]="port.name">
                        </mat-form-field>
                    </mat-grid-tile>
                    <!-- <mat-grid-tile>
                        <mat-form-field>
                            <mat-label>ID</mat-label>
                            <input matInput [(ngModel)]="port.id">
                        </mat-form-field>
                    </mat-grid-tile> -->
                    <mat-grid-tile>
                        <mat-form-field>
                            <mat-label>Direction</mat-label>
                            <mat-select [(value)]="port.direction">
                                <mat-option *ngFor="let d of directions" [value]="d">{{d}}</mat-option>
                            </mat-select>
                        </mat-form-field>
                    </mat-grid-tile>
                    <!-- <mat-grid-tile colspan="2">
                        <div>Endpoints: </div>
                        <div class="chip-wrapper">
                            <mat-chip-list>
                                <mat-chip *ngFor="let e of port.endpoints">{{ e.device }} : {{ e.port }}</mat-chip>
                            </mat-chip-list>
                        </div>
                    </mat-grid-tile> -->
                </mat-grid-list>
            </div>
            <div class="button-container">
                <button mat-stroked-button color="warn" (click)="onCancel()">Cancel</button>
                <button mat-raised-button color="primary" (click)="onSave()">Save</button>
            </div>
        </mat-dialog-content>
    `,
    styles: [`
        .system-container {
            min-width: 500px;
            min-height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        mat-form-field {
            margin: 0 10px 0 10px;
            width: 100%;
        }

        .chip-wrapper {
            width: 100%;
            border-bottom: 1px solid grey;
            margin: 20px;
            min-height: 50%;
        }

        mat-chip {
            margin-bottom: 5px;
        }

        .button-container {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            align-content: flex-end;
        }

        button {
            margin-left: 20px;
        }
    `],
})
export class PortEditComponent implements OnInit {
    port: Port = new Port();
    deviceName: string = "";

    directions: string[] = ['Input', 'Output', 'Bi-directional'];

    constructor(private dialogRef: MatDialogRef<PortEditComponent>,
        @Inject(MAT_DIALOG_DATA) private inputData: any) {
            this.deviceName = inputData.deviceName;
            if (inputData.port != null) {
                this.port.name = inputData.port.name;
                this.port.direction = inputData.port.direction;
            }
        }

    ngOnInit() {}

    onCancel() {
        this.dialogRef.close(false);
    }

    onSave() {
        this.dialogRef.close(this.port);
    }
}