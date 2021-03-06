
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';

import { RouterModule, Routes } from '@angular/router';
import { MfilesComponent } from './mfiles/mfiles.component';
import { MfileDetailComponent } from './mfile-detail/mfile-detail.component';
import { FoldersComponent } from './folders/folders.component';
import { StoragesComponent } from './storages/storages.component';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { FolderDetailComponent } from './folder-detail/folder-detail.component';
import { UrlMatcherComponent } from './url-matcher/url-matcher.component';
import { DirlistComponent } from './dirlist/dirlist.component';
import { FitDetailComponent } from './fit-detail/fit-detail.component';
import { FitsComponent } from './fits/fits.component';
import { TworkerDetailComponent } from './tworker-detail/tworker-detail.component';
import { TworkersComponent } from './tworkers/tworkers.component';
import { ScannerComponent } from './scanner/scanner.component';
import { LocationsComponent } from './locations/locations.component';
import { AttributesComponent } from './attributes/attributes.component';
import { PicFullscreenComponent } from './pic-fullscreen/pic-fullscreen.component';
import { MediumDetailComponent } from './medium-detail/medium-detail.component';


const routes: Routes = [
  {path: 'bookmarks', component: BookmarksComponent},
  {path: 'bookmark/new', component: BookmarkFormComponent},
  {path: 'bookmarks/:id', component: BookmarkFormComponent},
  {path: 'mfiles', component: MfilesComponent},
  {path: 'mfile/:id', component: MfileDetailComponent},
  {path: 'mfiles/folder/:id', component: MfilesComponent},
  {path: 'folders', component: FoldersComponent},
  {path: 'folders/:id', component: FolderDetailComponent},
  {path: 'folders/storage/:id', component: FoldersComponent},
  {path: 'storages', component: StoragesComponent},
  {path: 'storage/:id', component: StorageDetailComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'location/:id', component: LocationDetailComponent},
  {path: 'fits', component: FitsComponent},
  {path: 'fits/:id', component: FitDetailComponent},
  {path: 'tworkers', component: TworkersComponent},
  {path: 'tworkers/:id', component: TworkerDetailComponent},
  {path: 'scanner', component: ScannerComponent},
  {path: 'location/:id/fs', component: DirlistComponent},
  {path: 'attributes', component: AttributesComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    BookmarksComponent,
    BookmarkFormComponent,
    MfilesComponent,
    MfileDetailComponent,
    FoldersComponent,
    StoragesComponent,
    StorageDetailComponent,
    LocationDetailComponent,
    FolderDetailComponent,
    UrlMatcherComponent,
    DirlistComponent,
    FitDetailComponent,
    FitsComponent,
    TworkerDetailComponent,
    TworkersComponent,
    ScannerComponent,
    LocationsComponent,
    AttributesComponent,
    PicFullscreenComponent,
    MediumDetailComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

export class AppRoutingModule {}