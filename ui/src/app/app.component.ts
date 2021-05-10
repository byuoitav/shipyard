import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shipyard';

  selectedRole: string;

  roles: string[] = [
    "Install",
    "Inventory",
  ];

  constructor() {
    this.selectedRole = "Inventory";
  }
}
