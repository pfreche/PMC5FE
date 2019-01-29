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

  constructor(private http:Http, private route: ActivatedRoute) { 
  }

  ngOnInit() {
  
     this.route.params.subscribe( params => {
     let id = +params['id'];

     if (id) {
        this.http.get("http://artful:3000/tworkers/"+id)
            .subscribe( response => {this.tworker = response.json();});
     }
   }
   );
  }

  submit(x) {
    let id = x.value.id
    if (id != undefined) {
      this.http.put("http://artful:3000/tworkers/"+id,x.value)
      .subscribe(response => {
      })
    } else {
      this.http.post("http://artful:3000/tworkers/",x.value)
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
      this.http.delete("http://artful:3000/tworkers/"+id)
      .subscribe(response => {
        x.value.id = null
 //       open("http://www.google.de")
      })
    }
  }





}
