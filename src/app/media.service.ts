import { Bookmark } from './model/bookmark';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Location } from './model/location';

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
  workerActions = ["unkown", "Save Medium with Folder", "Fit and Scan", "Save Title", "Save as Parent URL",
        "Save as Mfile Property","Save Attri in Folder","Modulate URL", "Save as Youtube Folder", "unkown"]

  constructor(private http: HttpClient, private router: Router) {

    let apiUrl = localStorage.getItem("apiUrl");
    if (apiUrl) {
      this.apiUrl = apiUrl
      environment.baseUrl = apiUrl;
    }
    this.loadLocations();
    this.counter = this.counter + 1;
    console.log("counter ", this.counter)
  }

  loadLocations() {
    this.http.get(this.apiUrl + "locations/").subscribe((l: Location[]) => {
      this.locations = l;
      localStorage.setItem("location", JSON.stringify(this.locations));
    })
  }

  getLocations() {
    return this.http.get(this.apiUrl + "locations/");
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
    return this.http.get(this.apiUrl + "mfiles/" + id)
  }

  loadFolder(id: number) {
    return this.http.get(this.apiUrl + "folders/" + id)
  }

  deleteFolder(id: number) {
    return this.http.delete(this.apiUrl + "folders/" + id)
  }

  deleteMfilesWOPhysicalFile(id: number) {
    return this.http.put(this.apiUrl + "folders/" + id + "/removeMfilesWOPhysicalFile",{})
  }

  scanAndAddFromOriginLocation(id: number) {
    return this.http.get(this.apiUrl + "folders/" + id + "/scanAndAddFromOriginLocation");
  }


  download(id: number) {
    return this.http.get(this.apiUrl + "mfiles/" + id + "/download")
  }

  generateTn(id: number) {
    return this.http.get(this.apiUrl + "mfiles/" + id + "/generateTn")
  }

  loadMfiles() {
    return this.http.get(this.apiUrl + "mfiles/")
  }
  loadMfilesByFolder(folder_id) {
    this.folder_id = folder_id;
    return this.http.get(this.apiUrl + "mfiles/folder/" + folder_id)
  }
  loadFolders() {
    return this.http.get(this.apiUrl + "folders/")
  }

  moveFolderToLocation(folder_id, location_id) {
    return this.http.put(this.apiUrl + "folders/" + folder_id + "/moveToLocation", { "targetLocation_id": location_id })
  }

  addSuffixToBookmarkURL(bookmark_id) {
    return this.http.put(this.apiUrl + "bookmarks/" + bookmark_id + "/addSuffix", { "suffix": "?view=2" });
  }

  modulateBookmarkURL(bookmark_id) {
    return this.http.put(this.apiUrl + "bookmarks/" + bookmark_id + "/modulateURL", { "dummy": "1" });
  }

  loadFoldersByStorage(storage_id) {
    this.storage_id = storage_id;
    return this.http.get(this.apiUrl + "folders/storage/" + storage_id)
  }
  loadStorages() {
    return this.http.get(this.apiUrl + "storages/")
  }
  loadStorage(storage_id) {
    return this.http.get(this.apiUrl + "storages/" + storage_id)
  }
  loadLocation(location_id) {
    return this.http.get(this.apiUrl + "locations/" + location_id)
  }
  newLocationForStorage(storage_id) {
    return this.http.put(this.apiUrl + "storages/" + storage_id + "/newLocation", "aaa")
  }

  newLocation(location) {
    return this.http.post(this.apiUrl + "locations/", location)
  }

  match(url) {
    return this.http.get(this.apiUrl + "urlmatcher/?url=" + url)
  }

  nextFolder() {
    this.folder_id++;
    this.router.navigate(['/folders', this.folder_id]);
  }

  enhance(folder) {
    return this.http.get(this.apiUrl + "folders/" + folder.id + "/enhance")
  }

  loadAttris() {
    return this.http.get(this.apiUrl + "attris/")
  }

  addAttriToMfile(attriId,mfileId) {
    return this.http.post(this.apiUrl + "mfiles/"+mfileId+"/add_attri/",{"attri_id": attriId })    
  }

  removeAttriFromMfile(attriId,mfileId) {
    return this.http.delete(this.apiUrl + "mfiles/"+mfileId+"/remove_attri/"+attriId)    
  }

  loadAgroups() {
    return this.http.get(this.apiUrl + "agroups/")
  }

  loadMfilesByAttris(attris){

    const params = new HttpParams();
 
    attris.forEach(element => {
      alert(element.id);
      params.set(element.id, element.name)
          }); 

    return this.http.get(this.apiUrl + "attris/"+attris[0].id+"/mfiles",{params});
  }

  getWorkerAction(id){
     return this.workerActions[id];
  }

  getWorkerActions() {
    return this.workerActions;

  }

  getTitle(bookmark_id) {
    return   this.http.get(this.apiUrl+"bookmarks/"+bookmark_id+"/getTitle", {responseType: 'text'});
  }

}
