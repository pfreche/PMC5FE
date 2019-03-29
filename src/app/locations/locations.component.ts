import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Input() storage_id: number;
  @Input() changeBit: boolean;
  locations: any;
  baseUrl = environment.baseUrl;

  constructor(private http: Http, private router: Router) { }


  ngOnInit() {
    if (this.storage_id) {
    } else {
      this.load();
    }
  }

  load() {
    this.http.get(this.baseUrl + "locations")
      .subscribe((r: Response) => {
        this.locations = r.json();
      });
  }

  loadByStorage() {
    this.http.get(this.baseUrl + "storages/" + this.storage_id + "/locations")
    .subscribe((r: Response) => { this.locations = r.json(); });
  }

  update(location) {
    this.http.put(this.baseUrl + "locations/" + location.id, location)
      .subscribe(response => {
      })
  }

  delete(location) {
    this.http.delete(this.baseUrl + "locations/" + location.id)
      .subscribe(response => {
        this.loadByStorage();
      })

  }


  ngOnChanges() {

    if (this.storage_id) {
       this.loadByStorage();
    }
  }

}
