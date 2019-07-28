import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';
import { ScanResult } from '../model/attri.1';
import { Location } from '../model/location';
import { Folder } from '../model/folder';
import { LocationsComponent } from '../locations/locations.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  url: string;
  result: ScanResult;
  level = 1;
  location: Location;
  folder: Folder;
  status: string;
  baseUrl = environment.baseUrl;

  constructor(private mediaService: MediaService, private http:HttpClient, private route: ActivatedRoute) { 
  }


  ngOnInit() {
 
    this.url = this.route.snapshot.paramMap.get('url');

    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      if (this.url) {this.scan(this.level)}
      });   
  }

    scan(level) {
      this.status = "Scanning"
      this.http.get(this.baseUrl+"scanner/?url="+this.url+"&level="+level)
      .subscribe( (response:ScanResult) => {this.result = response; this.status = "okay";},
                  error => {this.status = error.status});  
    }

    scanAndLocate() {
      this.status = "Scanning and Locating"
      this.http.get(this.baseUrl+"scanner/?url="+this.url+"&level="+3+"&locate=x")
      .subscribe( (response:Location) => {this.location = response; this.status = "okay";},
               error => {this.status = error.status});  
        }
 
    scanSaveInLocation(location_id) {
      this.status = "Scanning and Saving"
      this.http.post(this.baseUrl+"scanner/", {url: this.url, location_id: location_id})
      .subscribe( (response:Folder) => {this.folder = response; this.status = "Scan and Saved!!!"},
      error => {this.status = error.status});
    }
 
    newFit() {
      let fit = {pattern: this.url}
  
      this.http.post(this.baseUrl+"fits/",fit)
      .subscribe(response => {
         this.scan(this.level);
      })
    }

    
}
