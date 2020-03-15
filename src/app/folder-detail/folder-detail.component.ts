import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Mfile } from '../model/mfile';
import { Folder } from '../model/folder';
import { Location } from '../model/location';
import { Input } from '@angular/core';
//import { loadElement } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.css']
})

export class FolderDetailComponent implements OnInit {

  @Input() folder: Folder;
  dirlist: boolean;
  locations: Location[];
  scanAndUpdate = ""
  mfiles: Mfile[];

  onlineTitle = "Get Title ...";

  constructor(private mediaService: MediaService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.dirlist = false;
    this.route.params.subscribe(params => {
      let id = +params['id'];

      if (id) {
        this.mediaService.loadFolder(id)
          .subscribe((response: Folder) => {
            this.folder = response;
            this.loadMfiles();
          })
      }
    }
    );
  }

  ngOnChanges() {
    this.loadMfiles();

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

  deleteMfilesWOPhysicalFile(folder_id) {
    if (confirm("Really delete the empty Mfiles in this folder?")) {
      return this.mediaService.deleteMfilesWOPhysicalFile(folder_id)
        .subscribe(response => {
          this.mediaService.loadFolder(folder_id)
            .subscribe((response: Folder) => {
              this.folder = response;
              this.scanAndUpdate = "Mfiles removed"
              this.loadMfiles();
            });
        });
    }
  }

  scanAndAddFromOriginLocation(folder_id) {
    if (confirm("Really scan this folder?")) {
      this.scanAndUpdate = "Update ongoing"
      return this.mediaService.scanAndAddFromOriginLocation(folder_id)
        .subscribe(response => {
          this.mediaService.loadFolder(folder_id)
            .subscribe((response: Folder) => {
              this.folder = response;
              this.scanAndUpdate = "Update done"
              this.loadMfiles();
            })
        });
    }
  }

  getLocationsT2() {
    return this.mediaService.getLocations()
      .subscribe((response: Location[]) => {
        this.locations = response;
        this.locations = this.locations.filter(location => location.typ === 2)
      });
  }

  moveToLocation(location_id) {
    return this.mediaService.moveFolderToLocation(this.folder.id, location_id)
      .subscribe((response: Location) => {
        this.mediaService.loadFolder(this.folder.id)
          .subscribe((response: Folder) => {
            this.folder = response;
          })
      });
  }

  addSuffix(bookmark_id) {
    return this.mediaService.addSuffixToBookmarkURL(bookmark_id)
      .subscribe(response => {
        this.mediaService.loadFolder(this.folder.id)
          .subscribe((response: Folder) => {
            this.folder = response;
          })
      });
  }

  modulateBookmarkURL(bookmark_id) {
    return this.mediaService.modulateBookmarkURL(bookmark_id)
      .subscribe(response => {
        this.mediaService.loadFolder(this.folder.id)
          .subscribe((response: Folder) => {
            this.folder = response;
          })
      });
  }

  loadMfiles() {
    this.mediaService.loadMfilesByFolder(this.folder.id)
      .subscribe((response: Mfile[]) => { this.mfiles = response; });

  }

  getTitle(bookmark_id) {
    this.mediaService.getTitle(bookmark_id)
      .subscribe((response: string) => { this.onlineTitle = response; });
  }


}
