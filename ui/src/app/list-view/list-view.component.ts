import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  objectType: string;
  selectedID: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.objectType = "";
    this.route.queryParams.subscribe(params => {
      this.selectedID = params['id'];
    })
  }

  ngOnInit(): void {
    // Set the desired object type based on path
    this.route.url.subscribe(segments => {
      this.objectType = segments[0].path
    })

  }

  selectedMessage(event: any) {
    this.selectedID = event;
    this.router.navigate(['/campuses'], {queryParams: {id: event}});
  }

}
