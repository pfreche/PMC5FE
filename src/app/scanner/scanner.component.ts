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
      this.http.get("http://artful:3000/scanner/?url="+this.url+"&level="+level)
      .subscribe( response => {this.result = response.json();});  
    }

    scanAndLocate() {
      this.http.get("http://artful:3000/scanner/?url="+this.url+"&level="+3+"&locate=x")
      .subscribe( response => {this.location = response.json();});  
    }
 
    scanSaveInLocation(location_id) {
      this.http.post("http://artful:3000/scanner/", {url: this.url, location_id: location_id})
      .subscribe( response => {this.folder = response.json();});
    }
 
    newFit() {
      let fit = {pattern: this.url}
  
      this.http.post("http://artful:3000/fits/",fit)
      .subscribe(response => {
         this.scan(this.level);
      })
    }

    
}
