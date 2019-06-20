import { environment } from './../../environments/environment';
import { Bookmark } from './../model/bookmark';
import { BcontrollerService } from './../bcontroller.service';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  @Input() fit_id: number;
  @Input() parentBookmark_id: number;
  @Input() refresh: boolean;

  bookmarks: string;
  bookmark: string;
  search: string;
  searchInput: string;
  baseUrl = environment.baseUrl;

  userQuestionUpdate = new Subject<string>();
  spinner = false;

  constructor(private http: Http, private bc: BcontrollerService) {
    //    bc.reloadSource$.subscribe( s => {
    //     this.load();
    //   })   

  }

  ngOnInit() {
    this.search = "";
//    this.load();

    this.userQuestionUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => { this.spinner = true;
        this.http.get(this.baseUrl + "bookmarks?search=" + this.searchInput)
        .subscribe((bookmarks: Response) => { this.bookmarks = bookmarks.json(); this.spinner = false; console.log(this.bookmarks) });
      });

  }

  // select( t: HTMLDivElement) {
  //   this.bc.selectBookmark(t.innerHTML)
  //    console.log(t.innerHTML)
  // }

  select(t) {
    this.bc.selectBookmark(<Bookmark>t)
    console.log(t)
  }

  load() {
    if (this.fit_id || this.parentBookmark_id) {  // do nothing since it loaded via ngOnChanges
    } else {
      this.http.get(this.baseUrl + "bookmarks")
        .subscribe((bookmarks: Response) => { this.bookmarks = bookmarks.json(); console.log(this.bookmarks) });
    }
  }

  filter() {
  }

  setSearch() {
    //    setTimeout(() => { this.search = this.searchInput;  }, 1000);
    this.http.get(this.baseUrl + "bookmarks?search=" + this.searchInput)
      .subscribe((bookmarks: Response) => { this.bookmarks = bookmarks.json(); console.log(this.bookmarks) });
  }

  ngOnChanges() {

    if (this.fit_id) {
      this.http.get(this.baseUrl + "fits/" + this.fit_id + "/bookmarks")
        .subscribe((bookmarks: Response) => { this.bookmarks = bookmarks.json(); });
    }

    if (this.parentBookmark_id) {
      this.http.get(this.baseUrl + "bookmarks/" + this.parentBookmark_id + "/getChildren")
        .subscribe((bookmarks: Response) => { this.bookmarks = bookmarks.json(); });
    }

  }

}
