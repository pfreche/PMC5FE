import { environment } from './../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.component.html',
  styleUrls: ['./storage-detail.component.css']
})
export class StorageDetailComponent implements OnInit {

  storage: any;
  id: number;
  location: any;
  changeBit = false;
  baseUrl = environment.baseUrl;


  constructor(private http: Http, private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.mediaService.loadStorage(this.id)
          .subscribe(response => { this.storage = response.json(); });
      }
    }
    );
  }

  submit(x) {
    let id = x.value.id;

    if (id != undefined) {
      this.http.put(this.baseUrl + "storages/" + id, x.value)
        .subscribe(response => {

        })
    } else {
      this.http.post(this.baseUrl + "storages/", x.value)
        .subscribe(response => {
          console.log(response.json())
          this.storage = response.json();
          this.router.navigate(['/storage', this.storage.id]);

        })
    }
  }

  new() {
    this.storage.id = null;
  }

  deepCopy() {
    this.http.post(this.baseUrl + "storages/"+this.storage.id+"/deepCopy", {id: this.storage.id})
    .subscribe(response => {
      this.storage = response.json();
      this.router.navigate(['/storage', this.storage.id]);
    });
  }

  delete(x) {
    let id = x.value.id
    if (confirm("Are you sure to delete ")) {
      if (id != undefined) {
        this.http.delete(this.baseUrl + "storages/" + id)
          .subscribe(response => {
            this.router.navigate(['/storages']);
          })
      }
    }
  }

  newLocation(typ: Number) {

    var location;

    switch (typ) {

      case 1:
        location = {
          storage_id
            : this.id, uri: "http://", name: "Web", typ: typ, inuse: true, origin: false
        }
        break;
      case 2:
        location = { storage_id: this.id, uri: "/", name: "FS", typ: typ, inuse: true, origin: false }
        break;
      case 3:
        location = { storage_id: this.id, uri: "http://", name: "Web TN", typ: typ, inuse: true, origin: false }
        break;
      case 4:
        location = { storage_id: this.id, uri: "/", name: "FS TN", typ: typ, inuse: true, origin: false }
        break;
    }



    this.mediaService.newLocation(location)
      .subscribe(response => {
        this.location = response.json();
        this.changeBit = !this.changeBit;
      });
  }



} 
