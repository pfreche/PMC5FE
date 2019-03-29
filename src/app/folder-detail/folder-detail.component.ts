import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.css']
})

export class FolderDetailComponent implements OnInit {

  folder: any;
  dirlist: boolean;

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
        .subscribe(response => {  }
    }
  }
}
}
