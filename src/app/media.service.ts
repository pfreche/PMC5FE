import { Bookmark } from './model/bookmark';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Response} from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  apiUrl = "http://artful:3000/";
  locations: any[];
  loc: Bookmark[];
  counter = 1;
  folder_id: number;
  storage_id: number;

  constructor(private http: Http, private router: Router) {
    this.loadLocations();
    this.counter = this.counter +1;
    console.log("counter ",this.counter)
  }

   loadLocations() {
    this.http.get(this.apiUrl+"locations/").subscribe((l: Response) => {this.locations = l.json();
      localStorage.setItem("location", JSON.stringify(this.locations));
    })
   }
   
   pathLocation(storage_id, typ) {
    let x = this.locations.filter(location => 
      (location.storage_id == storage_id && location.typ == typ && location.inuse)) 
    if (x[0]) {
      return x[0].uri;
    } else {
      return "not defined"
    } 
  }

  loadMfile(id: number) {
    return this.http.get(this.apiUrl+"mfiles/"+id)
  }

  loadFolder(id: number) {
    return this.http.get(this.apiUrl+"folders/"+id)
  }

  download(id: number) {
    return this.http.get(this.apiUrl+"mfiles/"+id+"/download")
  }
  
  generateTn(id: number) {
    return this.http.get(this.apiUrl+"mfiles/"+id+"/generateTn")
  }
  
  loadMfiles() {
    return this.http.get(this.apiUrl+"mfiles/")
  }
  loadMfilesByFolder(folder_id) {
    this.folder_id = folder_id;
    return this.http.get(this.apiUrl+"mfiles/folder/"+folder_id)
  }
  loadFolders() {
    return this.http.get(this.apiUrl+"folders/")
  }
  loadFoldersByStorage(storage_id) {
    this.storage_id = storage_id;
    return this.http.get(this.apiUrl+"folders/storage/"+storage_id)
  }
  loadStorages() {
    return this.http.get(this.apiUrl+"storages/")
  }
  loadStorage(storage_id) {
    return this.http.get(this.apiUrl+"storages/"+storage_id)
  }
  loadLocation(location_id) {
    return this.http.get(this.apiUrl+"locations/"+location_id)
  }

  match(url) {
    return this.http.get(this.apiUrl+"urlmatcher/?url="+url)
  }
  
  
  nextFolder() {
    this.folder_id++;
    this.router.navigate(['/folders',this.folder_id]);
  }

}
