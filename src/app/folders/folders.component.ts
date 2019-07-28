import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Subscriber } from 'rxjs';
import { Folder } from '../model/folder';
import { Storage } from '../model/storage';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

   folders: any;
   foldersBy: number  = 0;
   storage_id: number;
   storage: any;

   sortByPath = false;

  constructor(private mediaService: MediaService, 
    private route: ActivatedRoute, private router: Router) { 
      console.log("foldersBy on constructor ", this.foldersBy)

    }

  ngOnInit() {
            
     this.route.params.subscribe( params => {
      let id = +params['id'];
       if ( this.router.url.startsWith("/folders/storage"))  {
           if (id) {
             this.storage_id = id;
            this.mediaService.loadFoldersByStorage(id)
            .subscribe((r:Folder[]) => {this.folders = r; });
             this.mediaService.loadStorage(id)
             .subscribe( (r: Storage) => {this.storage = r; });
          }
         } else {
              this.mediaService.loadFolders()
              .subscribe((r:Folder[]) => {this.folders = r; });
            }
    });
    }
    
    pathLocation(storage_id, typ) {
      return this.mediaService.pathLocation(storage_id, typ)
    }

   enhance(folder) {
    this.mediaService.enhance(folder)
    .subscribe((response: Response) => {folder= folder.json(); });

   }

   sorte() {
    this.sortByPath = !this.sortByPath
    this.folders.sort((l,r) =>  {
      if (l.mpath > r.mpath) return 1;
      if (l.mpath < r.mpath) return -1;
      return 0;
    })
  }

  }
