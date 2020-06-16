import { Component, OnInit, Input } from '@angular/core';
import { Device } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

export class Port {
  ID: String;
  Device: String;
}

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent implements OnInit {
  @Input('device') device: Device;

  portColumns: String[] = ['port', 'connectedDevice'];

  incomingSource: MatTableDataSource<Port>;
  outgoingSource: MatTableDataSource<Port>;

  constructor() {
    this.incomingSource = new MatTableDataSource();
    this.incomingSource.data = this.incomingPorts;
    
    this.outgoingSource = new MatTableDataSource();
    this.outgoingSource.data = this.outgoingPorts;
  }

  ngOnInit(): void {
  }

  incomingPorts: Port[] = [
    {
      ID: '1',
      Device: 'test'
    },
    {
      ID: '2',
      Device: 'test'
    },
    {
      ID: '3',
      Device: 'test'
    },
    {
      ID: '4',
      Device: 'test'
    },
    {
      ID: '5',
      Device: 'test'
    },
    {
      ID: '6',
      Device: 'test'
    },
    {
      ID: '7',
      Device: 'test'
    },
    {
      ID: '8',
      Device: 'test'
    },
    {
      ID: '9',
      Device: 'test'
    }
  ];
  outgoingPorts: Port[] = [
    {
      ID: '1',
      Device: 'test'
    },
    {
      ID: '2',
      Device: 'test'
    },
    {
      ID: '3',
      Device: 'test'
    },
    {
      ID: '4',
      Device: 'test'
    },
    {
      ID: '5',
      Device: 'test'
    },
    {
      ID: '6',
      Device: 'test'
    },
    {
      ID: '7',
      Device: 'test'
    },
    {
      ID: '8',
      Device: 'test'
    },
    {
      ID: '9',
      Device: 'test'
    }
  ];

}
