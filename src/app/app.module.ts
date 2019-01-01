import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HttpModule } from '@angular/http';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'test', component: BookmarksComponent},
  {path: 're', redirectTo: 'http://www.google.de'},
  {path: 'red', component: BookmarksComponent}
]



@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    BookmarksComponent,
    BookmarkFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

export class AppRoutingModule {}