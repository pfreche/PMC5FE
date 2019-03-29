import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  location: any;
  baseUrl = environment.baseUrl;
  dirlist = false;
   
  constructor(private http: Http, private mediaService: MediaService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
     let id = +params['id'];
  
     if (id) {
        this.mediaService.loadLocation(id)
           .subscribe( response => {this.location = response.json();});
      }
    });
  }

  submit(x) {
    console.log(x);
    let id = x.value.id
    console.log("id ="+id)

    if (id != undefined) {
      this.http.put(this.baseUrl+"locations/"+id,x.value)
      .subscribe(response => {
        console.log(response.json()); 
      })
    } else {
      this.http.post(this.baseUrl+"locations/create",x.value)
      .subscribe(response => {
        console.log(response.json())
      })
    }
} 

}
