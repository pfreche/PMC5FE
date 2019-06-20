import { Http } from '@angular/http';
import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Mfile } from '../model/mfile';

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

  constructor(private http: Http, private mediaService: MediaService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.mfile = new Mfile(0, 0, "", "")
    this.route.params.subscribe(params => {
      console.log(params);
      let id = +params['id'];

      if (id) {
        this.mediaService.loadMfile(id)
          .subscribe(response => {
            this.mfile = response.json()[0];
            this.attrisSelected = response.json()[1];
            var res = /JPG|png|PNG/;
            var a = this.mfile.filename.replace(res, "jpg");
            console.log(" a =", a)
            this.tn = this.pathLocation(this.mfile.folder.storage_id, 3)
              + this.mfile.folder.mpath + this.mfile.folder.lfolder + a
          });
      }
    }
    );
    this.loadAttris();
  }

  pathLocation(storage_id, typ) {
    return this.mediaService.pathLocation(storage_id, typ)
  }

  download() {
    this.mediaService.download(this.mfile.id)
      .subscribe(response => { console.log("downloaded"); this.downloaded = "Downloaded" });

  }
  generateTn() {
    this.mediaService.generateTn(this.mfile.id)
      .subscribe(response => {
        console.log("tn generated");
        this.tn = this.tn + "?reload"
      });

  }
  loadAttris() {
    this.mediaService.loadAttris()
    .subscribe(response => {this.attris = response.json(); });
  }

  select(attri){
    this.mediaService.addAttriToMfile(attri.id,this.mfile.id)
    .subscribe(response => {this.attrisSelected = response.json(); });
  }
  

 deselect(attri){
    this.mediaService.removeAttriFromMfile(attri.id,this.mfile.id)
    .subscribe(response => {this.attrisSelected = response.json(); });
 }


}
