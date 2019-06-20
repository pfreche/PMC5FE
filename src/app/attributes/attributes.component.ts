import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Mfile } from '../model/mfile';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  attris: any[];
  agroups: any[];
  attrisSelected: any[];
  mfiles: Mfile[];

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.loadAttris();
    this.attrisSelected = [];
    this.loadAgroups();
  }
  
  loadAttris() {
    this.mediaService.loadAttris()
    .subscribe(response => {this.attris = response.json(); });
  }

  loadAgroups() {
    this.mediaService.loadAgroups()
    .subscribe(response => {this.agroups = response.json(); });
  }

  select(attri){
     this.attrisSelected.push(attri);
  }

  deselect(attri){
     this.attrisSelected = this.attrisSelected.filter(a => a!=attri);
  }


  loadMfilesByAttris() {
    this.mediaService.loadMfilesByAttris(this.attrisSelected)
    .subscribe(response => {this.mfiles = response.json(); });

  }

}
