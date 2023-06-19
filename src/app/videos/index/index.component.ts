import { Component, OnInit } from '@angular/core';

import { TutorialService } from '../tutorial.service';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  videos: Tutorial[] = [];

  // constructor() { }
  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getAll().subscribe((data: Tutorial[])=>{
      this.videos = data;
      console.log(this.videos);
    })
  }

  deleteTutorial(id_tutorial: number){
    this.tutorialService.delete(id_tutorial).subscribe(res => {
         this.videos = this.videos.filter(item => item.id !== id_tutorial);
         console.log('Tutorial deleted successfully!');
    })
  }

}
