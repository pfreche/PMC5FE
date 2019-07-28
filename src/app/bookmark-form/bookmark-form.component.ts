import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  baseUrl = environment.baseUrl

  constructor(private http:HttpClient, private bc: BcontrollerService,
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
          this.http.get(this.baseUrl+"bookmarks/"+id)
          .subscribe( (response :Bookmark) => {this.bookmark = response; console.log(this.bookmark)});
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
        this.http.put(this.baseUrl+"bookmarks/"+id,x.value)
        .subscribe(response => {
          this.updated = true;
          this.reloadList();
        })
      } else {
        console.log(x.value);
        this.http.post(this.baseUrl+"bookmarks/create",x.value)
        .subscribe((response : Bookmark) => {
          this.bookmark = response;
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
      this.http.delete(this.baseUrl+"bookmarks/"+id)
      .subscribe(response => {
        this.bookmark.id = null
        this.reloadList();
//        open("http://www.google.de")
      })
    }
  }

  newFit(x) {
    let fit = {id: null, bookmark_id: x.value.id, pattern: x.value.url}

    this.http.post(this.baseUrl+"fits/",fit)
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
          this.http.get(this.baseUrl+"bookmarks/"+id+"/fit")
          .subscribe( (response : Bookmark) => {this.bookmark = response});
   
  }

  getTitle() {
       this.http.get(this.baseUrl+"bookmarks/"+this.bookmark.id+"/getTitle", {responseType: 'text'} )
       .subscribe( (response:string)  => { this.bookmark.title = response; console.log(response)});
    
  }

}
