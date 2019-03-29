import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tworkers',
  templateUrl: './tworkers.component.html',
  styleUrls: ['./tworkers.component.css']
})

export class TworkersComponent implements OnInit {

  @Input() fit_id: number;
  @Input() changeBit: boolean;
  tworkers: any;
  baseUrl = environment.baseUrl;


  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    if (this.fit_id) {
    } else {
      this.load();
    }
  }

  loadByFit(fit_id) { //todo
    this.http.get(this.baseUrl+"fits/"+fit_id+"/tworkers")
    .subscribe((r: Response) => {
      this.tworkers = r.json(); });
  }

  load() {
    this.http.get(this.baseUrl+"tworkers")
    .subscribe((r: Response) => {
      this.tworkers = r.json(); });
  }

  update(tworker) {
    this.http.put(this.baseUrl+"tworkers/"+tworker.id,tworker)
    .subscribe(response => {
    })

  }

  ngOnChanges() {
    if (this.fit_id) {this.loadByFit(this.fit_id)}
   }

}
