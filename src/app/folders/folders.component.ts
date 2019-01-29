import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

   folders: any;
   foldersBy: number  = 0;

  constructor(private mediaService: MediaService, 
    private route: ActivatedRoute, private router: Router) { 
      console.log("foldersBy on constructor ", this.foldersBy)

    }

  ngOnInit() {
            
     this.route.params.subscribe( params => {
      let id = +params['id'];
       if ( this.router.url.startsWith("/folders/storage"))  {
           if (id) {
            this.mediaService.loadFoldersByStorage(id)
            .subscribe((folders: Response) => {this.folders = folders.json(); });
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

  }
