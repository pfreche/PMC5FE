import { Bookmark } from './../model/bookmark';
import { BcontrollerService } from './../bcontroller.service';
import { Component, OnInit, Input } from '@angular/core';
import {Http, Response} from '@angular/http';


@Component({
  selector: 'app-bookmarks', 
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  @Input() fit_id: number;
  @Input() refresh: boolean;

  bookmarks: string;
  bookmark: string;
  search: string;

  constructor(private http: Http, private bc: BcontrollerService) { 
//    bc.reloadSource$.subscribe( s => {
 //     this.load();
 //   })   

  }

  ngOnInit() { 
    this.search = ""
     this.load()
     }

  // select( t: HTMLDivElement) {
  //   this.bc.selectBookmark(t.innerHTML)
  //    console.log(t.innerHTML)
  // }

  select( t) {
    this.bc.selectBookmark(<Bookmark> t)
     console.log(t)
  }

  load() {
    if (this.fit_id) {
    } else {
    this.http.get("http://artful:3000/bookmarks")
    .subscribe((bookmarks: Response) => {this.bookmarks = bookmarks.json(); console.log(this.bookmarks)});
  }
}

  filter() {

  }

 ngOnChanges() {
   this.http.get("http://artful:3000/fits/"+this.fit_id+"/bookmarks")
   .subscribe((bookmarks: Response) => {this.bookmarks = bookmarks.json(); });
}
}
