import { Bookmark } from './../model/bookmark';
import { BcontrollerService } from './../bcontroller.service';
import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';


@Component({
  selector: 'bookmarks', 
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmarks: string;

  constructor(private http: Http, private bc: BcontrollerService) { 
    bc.reloadSource$.subscribe( s => {
      this.load();
    })   

  }

  ngOnInit() { 
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
    this.http.get("http://artful:3000/greet/hi")
    .subscribe((bookmarks: Response) => {this.bookmarks = bookmarks.json(); console.log(this.bookmarks)});
  }

}
