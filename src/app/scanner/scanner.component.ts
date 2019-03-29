import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  url: string;
  result: any;
  level = 1;
  location: string;
  folder: any;
  status: number;
  baseUrl = environment.baseUrl;

  constructor(private http:Http, private route: ActivatedRoute) { 
  }


  ngOnInit() {
 
    this.url = this.route.snapshot.paramMap.get('url');

    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      if (this.url) {this.scan(this.level)}
      });

    
  }

    scan(level) {
      this.status = null
      this.http.get(this.baseUrl+"scanner/?url="+this.url+"&level="+level)
      .subscribe( response => {this.result = response.json();this.status = response.status},
                  error => {this.status = error.status});  
    }

    scanAndLocate() {
      this.status = null
      this.http.get(this.baseUrl+"scanner/?url="+this.url+"&level="+3+"&locate=x")
      .subscribe( response => {this.location = response.json();this.status = response.status});  
    }
 
    scanSaveInLocation(location_id) {
      this.status = null
      this.http.post(this.baseUrl+"scanner/", {url: this.url, location_id: location_id})
      .subscribe( response => {this.folder = response.json();this.status = response.status});
    }
 
    newFit() {
      let fit = {pattern: this.url}
  
      this.http.post(this.baseUrl+"fits/",fit)
      .subscribe(response => {
         this.scan(this.level);
      })
    }

    
}
