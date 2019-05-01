import { Bookmark } from './model/bookmark';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  apiUrl = environment.baseUrl; 
  locations: any[];
  loc: Bookmark[];
  counter = 1;
  folder_id: number;
  storage_id: number;
  aee: number;

  constructor(private http: Http, private router: Router) {

    let apiUrl = localStorage.getItem("apiUrl");
    if (apiUrl) {
      this.apiUrl = apiUrl
      environment.baseUrl = apiUrl;
    }
   this.loadLocations();
    this.counter = this.counter +1;
    console.log("counter ",this.counter)
  }

   loadLocations() {
    this.http.get(this.apiUrl+"locations/").subscribe((l: Response) => {this.locations = l.json();
      localStorage.setItem("location", JSON.stringify(this.locations));
    })
   }

   getLocations() {
    return this.http.get(this.apiUrl+"locations/");
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

  deleteFolder(id: number) {
    return this.http.delete(this.apiUrl+"folders/"+id)
  }
  scanAndAddOriginLocation(id: number) {
    return this.http.get(this.apiUrl+"folders/"+id+"/scanAndAddOriginLocation");
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

  moveFolderToLocation(folder_id, location_id) {
    return this.http.put(this.apiUrl+"folders/"+folder_id+"/moveToLocation", {"targetLocation_id" : location_id} )
  }

  addSuffixToBookmarkURL(bookmark_id) {
    return this.http.put(this.apiUrl+"bookmarks/"+bookmark_id+"/addSuffix", {"suffix" "?view=2"} );
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
  newLocationForStorage(storage_id){
    return this.http.put(this.apiUrl+"storages/"+storage_id+"/newLocation","aaa")
  }
  
  newLocation(location) {
    return this.http.post(this.apiUrl+"locations/",location)
  }

  match(url) {
    return this.http.get(this.apiUrl+"urlmatcher/?url="+url)
  }
  
  
  nextFolder() {
    this.folder_id++;
    this.router.navigate(['/folders',this.folder_id]);
  }

 enhance(folder) {
  return this.http.get(this.apiUrl+"folders/"+folder.id+"/enhance")

 }

}
