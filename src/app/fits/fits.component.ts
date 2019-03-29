import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fits',
  templateUrl: './fits.component.html',
  styleUrls: ['./fits.component.css']
})
export class FitsComponent implements OnInit {

  fits: any;
  bookmarks: any;
  baseUrl = environment.baseUrl;

  @Input() bookmark_id: number;
  @Input() changeBit: boolean;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    if (this.bookmark_id) {
       this.tryFit(this.bookmark_id)
    } else {
      this.load();
    }
  }
  tryFit(bookmark_id) {
    this.http.get(this.baseUrl+"bookmarks/"+bookmark_id+"/fit")
    .subscribe((r: Response) => {
      this.fits = r.json(); console.log(this.fits)});

  }

  load() {
    this.http.get(this.baseUrl+"fits")
    .subscribe((r: Response) => {
      this.fits = r.json(); console.log(this.fits)});
  }


  scan_bak(fit_id) {
    this.http.get(this.baseUrl+"fits/"+fit_id+"/bookmarks")
    .subscribe((r: Response) => {
      this.bookmarks = r.json(); });

  }

  ngOnChanges() {
   this.tryFit(this.bookmark_id);     
  }

}
