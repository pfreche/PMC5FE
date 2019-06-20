import { MediaService } from './../media.service';
import { Mfile } from './../model/mfile';
import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-mfiles',
  templateUrl: './mfiles.component.html',
  styleUrls: ['./mfiles.component.css']
})

export class MfilesComponent implements OnInit {

  @Input() mfiles: Mfile[];
  show = true;
  caption = false;
  dl_counter = 0;
  direction = 1;
  downloading = "";

  pointer = 0;

  constructor(private mediaService: MediaService,
    private route: ActivatedRoute, private router: Router) {
    console.log("constructor", this.show)
  }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   console.log("route params executed", this.show)
    //   let id = +params['id'];
    //   this.dl_counter = 0;
    //   if (id) {
    //     this.mediaService.loadMfilesByFolder(id)
    //       .subscribe((mfiles: Response) => { this.mfiles = mfiles.json(); });
    //   } else {
    //     this.mediaService.loadMfiles()
    //       .subscribe((mfiles: Response) => { this.mfiles = mfiles.json(); });
    //   }
    // });
  }

  ngOnChanges() {

  }

  load() {
    this.mediaService.loadMfiles()
      .subscribe((mfiles: Response) => {
      this.mfiles = mfiles.json();
      });

  }

  pathLocation(storage_id, typ) {
    return this.mediaService.pathLocation(storage_id, typ)
  }

  mfilePath(mfile: Mfile) {
    var res = /JPG|png|PNG|jpeg|JPEG|PDF|pdf/;
    var a = mfile.filename.replace(res, "jpg");
    return this.pathLocation(mfile.folder.storage_id, 3) + mfile.folder.mpath + mfile.folder.lfolder + a
  }

  download() {
    this.dl_counter = 0;
    this.direction = 1;
    this.downloadNext(0);
  }

  downloadReverse() {
    this.dl_counter = this.mfiles.length - 1;
    this.direction = -1;
    this.downloadNext(this.dl_counter);
  }

  downloadNext(i) {
    this.downloading = this.mfiles[this.dl_counter].filename + " " + i;

    this.mediaService.download(this.mfiles[this.dl_counter].id)
      .subscribe(response => {
        console.log(this.mfiles[this.dl_counter].id, "downloaded", response.json());
        this.mfiles[this.dl_counter].filename = this.mfiles[this.dl_counter].filename + "?r";

        this.dl_counter = this.dl_counter + this.direction;
        if (this.mfiles[this.dl_counter]) {
          if (i < 1000) { this.downloadNext(i + 1) }
        }
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
        .subscribe(response => {
          console.log(mfile.id, "downloaded");
          blocker = false;
          this.mediaService.generateTn(mfile.id)
            .subscribe(response => {
              console.log("tn generated");
              mfile.filename = mfile.filename + "?reload=2222"
            });
        });
    }
  }

  generateTns() {

    for (let mfile of this.mfiles) {
      console.log("gggg " + mfile)
      this.mediaService.generateTn(mfile.id)
        .subscribe(response => {
          console.log("tn generated");
          mfile.filename = mfile.filename + "?reload=2222"
        });
    }
  }

  handleEvent(e) {
    console.log(e);
    if (e=="nextPic") 
       this.nextPic();
    if (e=="prevPic") 
       this.prevPic();
  }
  nextPic() {
    this.pointer = this.pointer +1 ;
    if (this.pointer == this.mfiles.length)
       this.pointer = 0;
  }
  prevPic() {
    this.pointer = this.pointer  - 1 ;
    if (this.pointer == -1)
       this.pointer = this.mfiles.length-1;
  }
  showPic(i) {
    this.pointer = i;
    console.log(this.pointer);
  }

}
