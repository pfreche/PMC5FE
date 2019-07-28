import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  location: Location;
  baseUrl = environment.baseUrl;
  dirlist = false;
   
  constructor(private http:HttpClient, private mediaService: MediaService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
     let id = +params['id'];
  
     if (id) {
        this.mediaService.loadLocation(id)
           .subscribe( (response:Location) => {this.location = response;});
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
        console.log(response); 
      })
    } else {
      this.http.post(this.baseUrl+"locations/create",x.value)
      .subscribe(response => {
        console.log(response)
      })
    }
} 

}
