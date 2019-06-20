import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Mfile } from '../model/mfile';
import { loadElement } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.css']
})

export class FolderDetailComponent implements OnInit {

  folder: any;
  dirlist: boolean;
  locations: any[];
  scanAndUpdate = ""
  mfiles: Mfile[];

  constructor(private mediaService: MediaService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.dirlist = false;
    this.route.params.subscribe(params => {
      let id = +params['id'];

      if (id) {
        this.mediaService.loadFolder(id)
          .subscribe(response => {
            this.folder = response.json();
            this.loadMfiles();
          })
      }
    }
    );

  }

  pathLocation(storage_id, typ) {
    return this.mediaService.pathLocation(storage_id, typ)
  }

  deleteFolder(folder_id) {
    if (confirm("Really delete the folder?")) {
      return this.mediaService.deleteFolder(folder_id)
        .subscribe(response => { });
    }
  }


  scanAndAddOriginLocation(folder_id) {
    this.scanAndUpdate = "Update ongoing"
    if (confirm("Really scan this folder?")) {
      return this.mediaService.scanAndAddOriginLocation(folder_id)
        .subscribe(response => {
          this.mediaService.loadFolder(folder_id)
            .subscribe(response => {
              this.folder = response.json();
              this.scanAndUpdate = "Update done"
              this.loadMfiles();
            })
        });
    }
  }

  getLocationsT2() {
    return this.mediaService.getLocations()
      .subscribe(response => {
        this.locations = response.json();
        this.locations = this.locations.filter(location => location.typ === 2)
      });
  }

  moveToLocation(location_id) {
    return this.mediaService.moveFolderToLocation(this.folder.id, location_id)
      .subscribe(response => {
        this.mediaService.loadFolder(this.folder.id)
          .subscribe(response => {
            this.folder = response.json();
          })
      });
  }

  addSuffix(bookmark_id) {
    return this.mediaService.addSuffixToBookmarkURL(bookmark_id)
      .subscribe(response => {
        this.mediaService.loadFolder(this.folder.id)
          .subscribe(response => {
            this.folder = response.json();
          })
      });

  }
  
  loadMfiles() {
    this.mediaService.loadMfilesByFolder(this.folder.id)
    .subscribe(response => { this.mfiles = response.json(); });

  }

}
