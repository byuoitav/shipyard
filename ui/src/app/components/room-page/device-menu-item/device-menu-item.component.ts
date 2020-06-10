import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeviceTypeNode } from 'src/app/services/api.service';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-device-menu-item',
  templateUrl: './device-menu-item.component.html',
  styleUrls: ['./device-menu-item.component.scss']
})
export class DeviceMenuItemComponent implements OnInit {
  @Input() nodes: DeviceTypeNode[];
  @ViewChild('deviceTypeMenu') public subMenu: MatMenu;

  constructor() { }

  ngOnInit(): void {
  }

}
