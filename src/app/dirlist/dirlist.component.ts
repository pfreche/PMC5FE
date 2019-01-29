import { Http, Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dirlist',
  templateUrl: './dirlist.component.html',
  styleUrls: ['./dirlist.component.css']
})
export class DirlistComponent implements OnInit {

  @Input() folder_id: number;
  relpath = "";
  list: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.dirlist("");
  }


  dirlist(d) {
    this.http.get("http://artful:3000/folders/"+this.folder_id+"/dir?relpath="+d)
    .subscribe((r: Response) => {
      this.list = r.json(); console.log(this.dirlist)});
  }

  subdir(d) {
    if (d == "..") {
        var res = /\/\w*$/;
        this.relpath = this.relpath.replace(res, "");
      } else {
        if (d != ".") { 
    this.relpath = this.relpath + "/"+d
    }
  }
    this.dirlist(this.relpath)

  }

}
