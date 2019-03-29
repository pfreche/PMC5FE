import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tworker-detail',
  templateUrl: './tworker-detail.component.html',
  styleUrls: ['./tworker-detail.component.css']
})
export class TworkerDetailComponent implements OnInit {

  tworker: any;
  baseUrl = environment.baseUrl;

  constructor(private http:Http, private route: ActivatedRoute) { 
  }

  ngOnInit() {
  
     this.route.params.subscribe( params => {
     let id = +params['id'];

     if (id) {
        this.http.get(this.baseUrl+"tworkers/"+id)
            .subscribe( response => {this.tworker = response.json();});
     }
   }
   );
  }

  submit(x) {
    let id = x.value.id
    if (id != undefined) {
      this.http.put(this.baseUrl+"tworkers/"+id,x.value)
      .subscribe(response => {
      })
    } else {
      this.http.post(this.baseUrl+"tworkers/",x.value)
      .subscribe(response => {
      })
    }
} 

  new() {
    this.tworker.id = null;
  }

  delete(x) {
    let id = x.value.id
    if (id != undefined) {
      this.http.delete(this.baseUrl+"tworkers/"+id)
      .subscribe(response => {
        x.value.id = null
 //       open("http://www.google.de")
      })
    }
  }





}
