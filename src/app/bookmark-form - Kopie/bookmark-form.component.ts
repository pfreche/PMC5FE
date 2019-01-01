import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  ypes = [
    {id: 1, name: "Angular"}, 
    {id: 2, name: "Bridge"},
    {id: 3, name: "ML"}
  ];

  constructor() { }
   
    
  ngOnInit() {
  }
 
  log(x) {
    console.log(x);
  }

  submit(x) {
      console.log(x);
  } 

}
