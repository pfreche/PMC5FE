import { MediaService } from './../media.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {

  constructor(private mediaService: MediaService) { }
  storages: Storage[];

  ngOnInit() {
    this.load();
  }

  load() {
    this.mediaService.loadStorages()
     .subscribe((response:Storage[]) => {this.storages = response;} );
  
    }


}
