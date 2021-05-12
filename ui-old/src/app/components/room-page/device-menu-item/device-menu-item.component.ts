import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeviceTypeNode } from '../devices/device-type-menu';

@Component({
  selector: 'app-device-menu-item',
  templateUrl: './device-menu-item.component.html',
  styleUrls: ['./device-menu-item.component.scss']
})
export class DeviceMenuItemComponent implements OnInit {
  @Input() nodes: DeviceTypeNode[];
  @Input() parent: any;
  @ViewChild('deviceTypeMenu') public subMenu;

  constructor() { }

  ngOnInit(): void {
  }

  createDevice(val: String) {
    this.parent.test(val);
  }

}
