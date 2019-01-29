import { Http } from '@angular/http';
import { BcontrollerService } from './../bcontroller.service';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../model/bookmark';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  created: boolean;
  updated: boolean;
  bookmark: Bookmark;
  changeBit =  false;

  constructor(private http:Http, private bc: BcontrollerService,
              private route: ActivatedRoute,
              private router: Router) { 
    bc.bookmarkSelected$.subscribe( bookmark => {
      this.bookmark = bookmark;
     })   
    
    this.bookmark = new Bookmark(0,"","","");
    this.created = false;
    this.updated = false;

    this.route.queryParams.subscribe( params => {
      let url = params['url'];
      let title = params['title'];
      if (url) {
        this.bookmark.url = url;
        this.bookmark.title = title;
        console.log("url");
        console.log(this.bookmark.url);
      }
    }
    )

    this.route.params.subscribe( params => {
           console.log(params) ;
          let id = +params['id'];

          if (id) {
          this.http.get("http://artful:3000/bookmarks/"+id)
          .subscribe( response => {this.bookmark = response.json(); console.log(this.bookmark)});
        }
        }
    );

    
  }
   
    
  ngOnInit() {
  }

  ngDoCheck() {
    
  }
 
  log(x) {
    console.log(x);
  }

  submit(x) {
      console.log(x);
      let id = x.value.id
      console.log("id ="+id)

      if (id != undefined) {
        this.http.put("http://artful:3000/bookmarks/"+id,x.value)
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
      this.http.delete("http://artful:3000/bookmarks/"+id)
      .subscribe(response => {
        console.log(response.json());
        this.reloadList();
        open("http://www.google.de")
      })
    }
  }

  newFit(x) {
    let fit = {id: null, bookmark_id: x.value.id, pattern: x.value.url}

    this.http.post("http://artful:3000/fits/",fit)
    .subscribe(response => {
      this.created = true;
      this.changeBit = !this.changeBit;
    })
  }

  scan(url) {
    console.log(url);
    this.router.navigate(['/scanner'], { queryParams: { url: url } });
  }





  tryFit(id) {
          this.http.get("http://artful:3000/bookmarks/"+id+"/fit")
          .subscribe( response => {this.bookmark = response.json(); console.log(this.bookmark)});
   
  }

}
