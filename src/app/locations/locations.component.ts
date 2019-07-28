import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../model/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Input() storage_id: number;
  @Input() changeBit: boolean;
  locations: Location[];
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
    if (this.storage_id) {
    } else {
      this.load();
    }
  }

  load() {
    this.http.get(this.baseUrl + "locations")
      .subscribe((r:Location[]) => {
        this.locations = r;
      });
  }

  loadByStorage() {
    this.http.get(this.baseUrl + "storages/" + this.storage_id + "/locations")
    .subscribe((r:Location[]) => { this.locations = r; });
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
