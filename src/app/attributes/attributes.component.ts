import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Mfile } from '../model/mfile';
import { Attri } from '../model/attri';
import { Agroup } from '../model/agroup';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  attris: Attri[];
  agroups: Agroup[];
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
    .subscribe((response:Attri[]) => {this.attris = response });
  }

  loadAgroups() {
    this.mediaService.loadAgroups()
    .subscribe((response:Agroup[]) => {this.agroups = response; });
  }

  select(attri){
     this.attrisSelected.push(attri);
     this.loadMfilesByAttris();
    }

  deselect(attri){
     this.attrisSelected = this.attrisSelected.filter(a => a!=attri);
     this.loadMfilesByAttris();
  }


  loadMfilesByAttris() {
    this.mediaService.loadMfilesByAttris(this.attrisSelected)
    .subscribe((response : Mfile[]) => {this.mfiles = response; });

  }

}
