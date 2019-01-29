import { ActivatedRoute } from '@angular/router';
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
  constructor(private http: Http, private mediaService: MediaService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
     let id = +params['id'];
     if (id) {
        this.mediaService.loadStorage(id)
           .subscribe( response => {this.storage = response.json();});
      }
    }
  );
  
  }

}
