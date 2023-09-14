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
  filteredVideos: Tutorial[] = [];
  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getAll().subscribe((data: Tutorial[])=>{
      this.videos = data;
      this.filteredVideos = [...this.videos];
      this.filteredVideos = data.sort((a, b) => a.id - b.id);
      console.log(this.videos);
    })
  }

  deleteTutorial(id_tutorial: number){
    this.tutorialService.delete(id_tutorial).subscribe(res => {
         this.videos = this.videos.filter(item => item.id !== id_tutorial);
         console.log('Tutorial deleted successfully!');
    })
  }
  filter(filterValue: any) {
    if (!filterValue) {
      // Si el filtro está vacío, restaura la lista completa de videos
      this.filteredVideos = [...this.videos];
    } else {
      // Filtra los videos por id, nombre o fecha
      this.filteredVideos = this.videos.filter(video =>
        video.id.toString().includes(filterValue) ||
        video.titulo.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }
}
