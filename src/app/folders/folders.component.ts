import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import {Response} from '@angular/http';
import { Subscriber } from 'rxjs';

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
            .subscribe((folders: Response) => {this.folders = folders.json(); });
             this.mediaService.loadStorage(id)
             .subscribe( (r: Response) => {this.storage = r.json()});
          }
         } else {
              this.mediaService.loadFolders()
             .subscribe((folders: Response) => {this.folders = folders.json(); });
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
  }
