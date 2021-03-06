import { MediaService } from './media.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'fe-pmc5';

  constructor(private router: Router, private mediaService: MediaService) {
  }

  nextFolder() {
    this.mediaService.nextFolder();
  }

}
