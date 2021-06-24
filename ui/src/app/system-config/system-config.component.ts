import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { System } from '../services/system';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {
  system: System = new System();


  constructor(private route: ActivatedRoute,
    private api: ApiService) {
    var systemID = Number(this.route.snapshot.paramMap.get('systemID'));
    this.system = this.api.getSystemByID(systemID);
  }

  ngOnInit(): void {}

}
