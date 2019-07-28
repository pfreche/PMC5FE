import { Component, OnInit, Input } from '@angular/core';
import { Mfile } from '../model/mfile';
import { MediaService } from '../media.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-medium-detail',
  templateUrl: './medium-detail.component.html',
  styleUrls: ['./medium-detail.component.css']
})
export class MediumDetailComponent implements OnInit {

  @Input() mfile: Mfile;
  tn: String;
  downloaded = "";
  attris: any[];
  attrisSelected: any[];
  youtubeUrl: String;
  youtubeUrlEmbedded: SafeResourceUrl;

  constructor(private mediaService: MediaService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges() {

    var res = /JPG|png|PNG|pdf|PDF/;
    var a = this.mfile.filename.replace(res, "jpg");
    console.log(" a =", a)
    this.tn = this.pathLocation(this.mfile.folder.storage_id, 3)
      + this.mfile.folder.mpath + this.mfile.folder.lfolder + a
      console.log(" tn  =", this.tn)
    if (this.mfile.mtype == 7) {
      this.youtubeUrl =  "https://www.youtube.com/watch?v="+this.mfile.filename.substr(-15,11);
      let dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.mfile.filename.substr(-15,11);

      this.youtubeUrlEmbedded  = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);

      console.log("youtube : " + this.youtubeUrlEmbedded);
    }
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
        this.tn = this.tn + "?r"
      });

  }
 
}
