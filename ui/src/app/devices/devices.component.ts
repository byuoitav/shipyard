import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  selectedID: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedID = params['id'];
    })
  }

  ngOnInit(): void {
  }

  selectedMessage(event: any) {
    this.selectedID = event;
    this.router.navigate(['/devices'], {queryParams: {id: event}});
  }

}





