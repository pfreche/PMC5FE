import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../media.service';
import { Tworker } from '../model/tworker';

@Component({
  selector: 'app-tworkers',
  templateUrl: './tworkers.component.html',
  styleUrls: ['./tworkers.component.css']
})

export class TworkersComponent implements OnInit {

  @Input() fit_id: number;
  @Input() changeBit: boolean;
  tworkers: Tworker[];
  baseUrl = environment.baseUrl;
  a = "";

  constructor(private mediaService: MediaService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.fit_id) {
    } else {
      this.load();
    }
  }

  loadByFit(fit_id) { //todo
    this.http.get(this.baseUrl+"fits/"+fit_id+"/tworkers")
    .subscribe((r:Tworker[]) => {
      this.tworkers = r; });
  }

  load() {
    this.http.get(this.baseUrl+"tworkers")
    .subscribe((r:Tworker[]) => {
      this.tworkers = r; });
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
