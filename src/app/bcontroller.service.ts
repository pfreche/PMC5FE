import { Bookmark } from './model/bookmark';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BcontrollerService {

  // Observable bookmark sources
  private bookmarkSelectedSource = new Subject<Bookmark>();
  bookmarkSelected$ = this.bookmarkSelectedSource.asObservable();
 
  // Observable string sources
  private reloadSource = new Subject<string>();
  reloadSource$ = this.reloadSource.asObservable();
 
  constructor() { }

// Service message commands
  selectBookmark(bookmark: Bookmark) {
     console.log("-_>"+bookmark.title)
    this.bookmarkSelectedSource.next(bookmark);
  }

// Service message commands
    
  reloadList(s: string) {
    console.log("relaod > "+s)
    this.reloadSource.next(s);
  }

  // selectBookmark(title: string) {
  //   console.log("-_>"+title)
  //   this.bookmarkSelectedSource.next(title);
  // }

}
