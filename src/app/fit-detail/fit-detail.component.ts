import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fit-detail',
  templateUrl: './fit-detail.component.html',
  styleUrls: ['./fit-detail.component.css']
})
export class FitDetailComponent implements OnInit {

  @Input() bookmark_id: number;

  fit: any;
  updated = false;
  created = false;
  changeBit =  false;
  refresh = false;
  baseUrl = environment.baseUrl;

  constructor(private http:Http, private route: ActivatedRoute) { 
  }

  ngOnInit() {
  
     this.route.params.subscribe( params => {
     let id = +params['id'];

     if (id) {
        this.http.get(this.baseUrl+"fits/"+id)
            .subscribe( response => {this.fit = response.json();});
     }
   }
   );
  }


  submit(x) {
    let id = x.value.id
    if (id != undefined) {
      this.http.put(this.baseUrl+"fits/"+id,x.value)
      .subscribe(response => {
        console.log(response.json()); 
        this.updated = true;
      })
    } else {
      console.log("llllllllllllllll");
      console.log(x.value);
      this.http.post(this.baseUrl+"fits/",x.value)
      .subscribe(response => {
        this.created = true;
      })
    }
    this.refresh = !this.refresh;
} 

  new() { 
    this.fit = {id: null, pattern: "eee"};
  }

  delete(x) {
    let id = x.value.id
    if (id != undefined) {
      this.http.delete(this.baseUrl+"fits/"+id)
      .subscribe(response => {
        open("http://www.google.de")
      })
    }
  }

   cancel() {
   }

   newTworker(x,typ) {
    let id = x.value.id
    console.log(typ)
    var tworker;
    switch ( typ) {
      case 1: 
        tworker = {fit_id: id, pattern: "(.*)", name: "New", final: false}
        break;  
      case 2: 
        tworker = {fit_id: id, tag: "a", attr: "href", pattern: "(.*)", name: "Link", final: false} 
        break;
      case 3: 
        tworker = {fit_id: id, tag: "img", attr: "src", pattern: "(.*)", name: "Image", final: true} 
        break;
      case 4: 
        tworker = {fit_id: id, tag: "title", attr: "", pattern: "(.*)", name: "Title", final: true} 
        break;
      }  
    this.http.post(this.baseUrl+"tworkers/",tworker)
    .subscribe(response => {
      this.changeBit = !this.changeBit
    })
   }

}
