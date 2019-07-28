import { HttpClient } from '@angular/common/http';
import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Mfile } from '../model/mfile';
import { Attri } from '../model/Attri';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-mfile-detail',
  templateUrl: './mfile-detail.component.html',
  styleUrls: ['./mfile-detail.component.css']
})

export class MfileDetailComponent implements OnInit {

  mfile: Mfile;
  tn: String;
  downloaded = "";
  attris: any[];
  attrisSelected: any[];
  searchInput: string;
  userQuestionUpdate = new Subject<string>();
  test = "test";

  constructor(private http: HttpClient, private mediaService: MediaService, private route: ActivatedRoute) {
  }

  ngOnInit() {
//    this.mfile = new Mfile(0, 0, "", "")
    this.route.params.subscribe(params => {
      console.log(params);
      let id = +params['id'];

      if (id) {
        this.mediaService.loadMfile(id)
          .subscribe((response:Mfile) => {
            this.mfile = response;
  //          this.mfile.title = "blaa";
             console.log("title "+ this.mfile.title);
            this.attrisSelected = this.mfile.attris;
          });
      }
    }
    );
    this.loadAttris();

    this.userQuestionUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {       });


  }

  loadAttris() {
    this.mediaService.loadAttris()
    .subscribe((response:Attri[]) => {this.attris = response; });
  }

  select(attri){
    this.mediaService.addAttriToMfile(attri.id,this.mfile.id)
    .subscribe((response:Attri[]) => {this.attrisSelected = response; });
  }
  

 deselect(attri){
    this.mediaService.removeAttriFromMfile(attri.id,this.mfile.id)
    .subscribe((response:Attri[]) => {this.attrisSelected = response; });
 }

}
