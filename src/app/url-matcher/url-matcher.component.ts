import { MediaService } from './../media.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-url-matcher',
  templateUrl: './url-matcher.component.html',
  styleUrls: ['./url-matcher.component.css']
})
export class UrlMatcherComponent implements OnInit {

  @Input() url: string;
  matches: any[];
  a = "hallo"

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.match();
  }

  match() {

    console.log("url>  ", this.url, this.a)
    this.mediaService.match(this.url)
    .subscribe((response) => {this.matches = response.json();} );
    

  }

}
