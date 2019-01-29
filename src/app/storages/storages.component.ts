import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {

  constructor(private mediaService: MediaService) { }
  storages: any[];

  ngOnInit() {
    this.load();
  }

  load() {
    this.mediaService.loadStorages()
     .subscribe((storages: Response) => {this.storages = storages.json();} );
  
    }


}
