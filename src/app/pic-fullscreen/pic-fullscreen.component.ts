import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Mfile } from '../model/mfile';
import { MediaService } from '../media.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32
}

@Component({
  selector: 'app-pic-fullscreen',
  templateUrl: './pic-fullscreen.component.html',
  styleUrls: ['./pic-fullscreen.component.css']
})


export class PicFullscreenComponent implements OnInit {

  @Input() mfile: Mfile;
  picUrl: string;
  closeResult: string;
  isVisible = false;

  @Output()
  nextPicEvent: EventEmitter<String> = new EventEmitter<String>(); //creating an output event


  constructor(private mediaService: MediaService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.picUrl = this.pathLocation(this.mfile.folder.storage_id, 1)
    + this.mfile.folder.mpath + this.mfile.folder.lfolder + this.mfile.filename;

  }

  pathLocation(storage_id, typ) {
    return this.mediaService.pathLocation(storage_id, typ)
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPicEvent.emit("nextPic");
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.nextPicEvent.emit("prevPic");
    }

    if (event.keyCode === KEY_CODE.SPACE) {
      this.toggleVisibility();
    }


  }



  toggleVisibility(){
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
  }

  nextPic() {

  }

  prevPic() {

  }

  onKeydown(event) 
  {
   this.toggleVisibility();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}