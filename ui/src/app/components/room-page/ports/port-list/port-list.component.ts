import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Device } from '../../devices/device';
import { Port } from '../port';
import { PortConfigComponent } from '../port-config/port-config.component';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent implements OnInit {
  @Input('device') device: Device;
  @Output() selected = new EventEmitter<Port>();
  @Output() deletePort = new EventEmitter<any>();

  portColumns: String[] = ['port', 'connectedDevice'];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  selectPort(p: Port) {
    this.selected.emit(p);
  }

  filterPorts(incoming: boolean): Port[] {
    var output = [];
    this.device.Ports.forEach(p => {
      if (p.Incoming == incoming) {
        output.push(p);
      }
    });
    return output;
  }

  configurePort(p: Port) {
    let ref = this.dialog.open(PortConfigComponent, {data: p});

    ref.componentInstance.onDelete.subscribe(data => {
      this.deletePort.emit({
        Device: data.delete,
        Port: this.device.ID
      });
    });
  }
}
