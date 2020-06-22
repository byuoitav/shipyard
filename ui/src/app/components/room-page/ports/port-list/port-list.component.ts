import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from 'src/app/services/api.service';

export class Port {
  ID: String;
  Device: String;
  Incoming: boolean;
}

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

  constructor() {
  }

  ngOnInit(): void {
  }

  test(port: Port) {
    
  }

  selectPort(p: Port) {
    if (p.Device == "") {
      this.selected.emit(p);
    }
  }

  filterPorts(incoming: boolean): Port[] {
    var output = [];
    this.ports.forEach(p => {
      if (p.Incoming == incoming) {
        output.push(p);
      }
    });
    return output;
  }

  ports: Port[] = [
    {
      ID: '1',
      Device: '',
      Incoming: true
    },
    {
      ID: '2',
      Device: '',
      Incoming: true
    },
    {
      ID: '3',
      Device: '',
      Incoming: true
    },
    {
      ID: '4',
      Device: 'test',
      Incoming: true
    },
    {
      ID: '5',
      Device: 'test',
      Incoming: true
    },
    {
      ID: '6',
      Device: 'test',
      Incoming: false
    },
    {
      ID: '7',
      Device: '',
      Incoming: false
    },
    {
      ID: '8',
      Device: 'test',
      Incoming: false
    },
    {
      ID: '9',
      Device: '',
      Incoming: false
    }
  ];

}
