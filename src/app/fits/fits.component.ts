import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Fit } from '../model/fit';

@Component({
  selector: 'app-fits',
  templateUrl: './fits.component.html',
  styleUrls: ['./fits.component.css']
})
export class FitsComponent implements OnInit {

  fits: Fit[];
  baseUrl = environment.baseUrl;

  @Input() bookmark_id: number;
  @Input() changeBit: boolean;

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.bookmark_id) {
       this.tryFit(this.bookmark_id)
    } else {
      this.load();
    }
  }
  tryFit(bookmark_id) {
    this.http.get(this.baseUrl+"bookmarks/"+bookmark_id+"/fit")
    .subscribe((r: Fit[]) => {
      this.fits = r; });

  }

  load() {
    this.http.get(this.baseUrl+"fits")
    .subscribe((r: Fit[]) => {
      this.fits = r; });
  }

  ngOnChanges() {
   this.tryFit(this.bookmark_id);     
  }

}
