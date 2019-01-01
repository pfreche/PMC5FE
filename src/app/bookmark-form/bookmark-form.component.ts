import { Http } from '@angular/http';
import { BcontrollerService } from './../bcontroller.service';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../model/bookmark';

@Component({
  selector: 'bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  created: boolean;
  updated: boolean;
  bookmark: Bookmark;

  constructor(private http:Http, private bc: BcontrollerService) { 
    // bc.bookmarkSelected$.subscribe( title => {this.bookmark.title = title; console.log("title "+title) })  
    bc.bookmarkSelected$.subscribe( bookmark => {
      // this.bookmark = new Bookmark(bookmark.id, bookmark.title, bookmark.url, bookmark.description);
      // // this.bookmark = new Bookmark();
      // // this.bookmark = bookmark;
      // this.bookmark.id = bookmark.id;
      // this.bookmark.title = bookmark.title;
      // this.bookmark.url = bookmark.url;
      // this.bookmark.description = bookmark.description;
      this.bookmark = bookmark;
      console.log("b title"+bookmark.title); 
    })   
    this.bookmark = new Bookmark(0,",","","");
    this.created = false;
    this.updated = false;
  }
   
    
  ngOnInit() {
  }
 
  log(x) {
    console.log(x);
  }

  submit(x) {
      console.log(x);
      let id = x.value.id
      console.log("id ="+id)

      if (id != undefined) {
        this.http.put("http://artful:3000/greet/"+id,x.value)
        .subscribe(response => {
          console.log(response.json()); 
          this.updated = true;
          this.reloadList();
        })
      } else {
        this.http.post("http://artful:3000/greet/create",x.value)
        .subscribe(response => {
          console.log(response.json())
          this.created = true;
          this.reloadList();
        })
      }
  } 

  reloadList() {
    console.log("call reloadlist")
    this.bc.reloadList("reload")
  }

  cancel() {
    alert("Abbruc");
  }

  new() {
    this.bookmark = new Bookmark(1,"","","");
  }

  delete(x) {
    let id = x.value.id
    console.log("id ="+id)

    if (id != undefined) {
      this.http.delete("http://artful:3000/greet/"+id)
      .subscribe(response => {
        console.log(response.json());
        this.reloadList();
        open("http://www.google.de")
      })
    }
  }

}
