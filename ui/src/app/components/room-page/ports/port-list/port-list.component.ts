import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device, Port } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PortConfigComponent } from '../port-config/port-config.component';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent implements OnInit {
  @Input('device') device: Device;
  @Input('incoming') incoming: boolean;
  @Input('outgoing') outgoing: boolean;
  @Output() selected: EventEmitter<Port> = new EventEmitter();

  portColumns: String[] = ['port', 'connectedDevice'];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  test(port: Port) {
    
  }

  selectPort(p: Port) {
    if (p.Endpoint.length == 0) {
      this.selected.emit(p);
    }
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
    this.dialog.open(PortConfigComponent, {data: p});
  }
}
