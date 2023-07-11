import { Component, OnInit } from '@angular/core';
import { KmlContenedorService } from '../kml-contenedor.service';
import { KmlContenedor } from '../kml-contenedor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  kmls: KmlContenedor[] = [];
  fileToUpload: File | null = null;

  // constructor() { }
  constructor(public kmlContenedorService: KmlContenedorService) { }

  ngOnInit(): void {
    this.kmlContenedorService.getAll().subscribe((data: KmlContenedor[])=>{
      this.kmls = data;
      console.log(this.kmls);
    })
  }

  deleteKML(id:number){
    this.kmlContenedorService.delete(id).subscribe(res => {
         this.kmls = this.kmls.filter(item => item.id !== id);
         console.log('Kml eliminado satisfactoriamente!');
    })
  }
  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    }
  }

  getFileName(file: File): string {
    if (file) {
      return file.name;
    } else {
      return '';
    }
  }
  
  uploadFile() {
    if (this.fileToUpload) {
      const kmlContenedor: KmlContenedor = {
        id:1,
        archivo_kml: this.fileToUpload,
        nombre_archivo:this.getFileName(this.fileToUpload),
        fecha_carga: new Date()
      };

      this.kmlContenedorService.create(kmlContenedor).subscribe(
        (response) => {
          console.log('File uploaded successfully.');
          this.kmls.push(response); // Agregar el KmlContenedor al array de kmls
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

}
