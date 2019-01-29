import { MediaService } from './../media.service';
import { Mfile } from './../model/mfile';
import { Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-mfiles',
  templateUrl: './mfiles.component.html',
  styleUrls: ['./mfiles.component.css']
})

export class MfilesComponent implements OnInit {

  mfiles: Mfile[];
  show = true;
  caption = false;
  dl_counter = 0;
  downloading = "";

 constructor(private mediaService: MediaService, 
    private route: ActivatedRoute, private router: Router) { 
      console.log("constructor", this.show)
    }

  ngOnInit() {
//    this.load();    

    this.route.params.subscribe( params => {
      console.log("route params executed", this.show)
      let id = +params['id'];
      this.dl_counter = 0;
       if ( id) {
         this.mediaService.loadMfilesByFolder(id)
         .subscribe((mfiles: Response) => {this.mfiles = mfiles.json();} );
         } else {
          this.mediaService.loadMfiles()
          .subscribe((mfiles: Response) => {this.mfiles = mfiles.json();} );
         } 
      });
    }

  load() {
    this.mediaService.loadMfiles()
     .subscribe((mfiles: Response) => {this.mfiles = mfiles.json();
    } );
  
    }

  pathLocation(storage_id, typ) {
    return this.mediaService.pathLocation(storage_id, typ)
  }

  mfilePath(mfile: Mfile) {
      var res = /JPG|png|PNG/;
      var a = mfile.filename.replace(res, "jpg");
      return this.pathLocation(mfile.folder.storage_id,3)+ mfile.folder.mpath +a 
  }

  download() {
    this.dl_counter = 0;
    this.downloadNext(0);
  }

  downloadNext(i) {
    this.downloading = this.mfiles[this.dl_counter].filename;
 
    this.mediaService.download(this.mfiles[this.dl_counter].id)
         .subscribe( response => { 
           console.log(this.mfiles[this.dl_counter].id, "downloaded", response.json()); 
           this.mfiles[this.dl_counter].filename = this.mfiles[this.dl_counter].filename+ "?r";

           this.dl_counter = this.dl_counter + 1
           if(this.mfiles[this.dl_counter] ) {
           if (i< 1000) {this.downloadNext(i+1)} }
           else {
             this.dl_counter = 0;
             this.downloading = "";
           }
        });
  } 

  

 download2() {
    
    let blocker = false
    for (let mfile of this.mfiles) {
      this.mediaService.download(mfile.id)
         .subscribe( response => { console.log(mfile.id, "downloaded"); 
         blocker = false;
         this.mediaService.generateTn(mfile.id)
         .subscribe( response => { console.log("tn generated"); 
         mfile.filename = mfile.filename+ "?reload=2222" });   });
           }
  }

  generateTns(){
    
    for (let mfile of this.mfiles) {
      console.log("gggg "+mfile)
       this.mediaService.generateTn(mfile.id)
         .subscribe( response => { console.log("tn generated"); 
         mfile.filename = mfile.filename+ "?reload=2222" });
    }
        }    

}
