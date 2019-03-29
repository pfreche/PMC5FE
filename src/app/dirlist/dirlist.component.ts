import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dirlist',
  templateUrl: './dirlist.component.html',
  styleUrls: ['./dirlist.component.css']
})
export class DirlistComponent implements OnInit {

  @Input() folder_id: number;
  @Input() location_id: number;
  relpath = "";
  list: any;
  baseUrl = environment.baseUrl;
  location: any;

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {

    if (!this.folder_id && !this.location_id) {

      this.route.params.subscribe(params => {
        let id = +params['id'];
        this.location_id = id;  // assuming online route /location/:id/fs
        if (id) {
          this.http.get(this.baseUrl + "locations/" + id)
            .subscribe(response => {
              this.location = response.json();
              this.dirlist("");
            });
        }
      }
      );
    } else {
      this.dirlist("");
    }

  }


  dirlist(d) {
    if (this.folder_id) {
      this.http.get(this.baseUrl + "folders/" + this.folder_id + "/dir?relpath=" + d)
        .subscribe((r: Response) => {
          this.list = r.json();
        });
    }
    if (this.location_id) {
      this.http.get(this.baseUrl + "locations/" + this.location_id + "/dir?relpath=" + d)
        .subscribe((r: Response) => {
          this.list = r.json();
        });
    }
  }

  subdir(d) {
    if (d == "..") {
      var res = /\/[^\/]*$/;
      let relpath = this.relpath.replace(res, "");
      this.relpath = relpath;
    } else {
      if (d != ".") {
        this.relpath = this.relpath + "/" + d
      }
    }
    this.dirlist(this.relpath)
  }

  addFolder(relpath) {
    if (this.location_id) {
      this.http.post(this.baseUrl + "locations/" + this.location_id + "/addFolder",
        { relpath: relpath })
        .subscribe((r: Response) => {
        });
    }
  }


}
