import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

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

  selectedMessage(event: number) {
    this.selectedID = event;
    this.router.navigate(['/buildings'], {queryParams: {id: event}});
  }
}
