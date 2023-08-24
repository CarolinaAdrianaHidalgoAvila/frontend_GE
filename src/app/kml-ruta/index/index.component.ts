import { Component, OnInit } from '@angular/core';
import { KmlRutaService } from '../kml-ruta.service';
import { KmlRuta } from '../kml-ruta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  kmls: KmlRuta[] = [];
  fileToUpload: File | null = null;
  idKmlRuta: number=0;
  constructor(
    public kmlRutaService: KmlRutaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.kmlRutaService.getAll().subscribe((data: KmlRuta[])=>{
      this.kmls = data;
      console.log(this.kmls);
    })
  }

  deleteKML(id:number){
    this.kmlRutaService.delete(id).subscribe(res => {
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
      const kmlRuta: KmlRuta = {
        id:1,
        archivo_kml: this.fileToUpload,
        nombre_archivo:this.getFileName(this.fileToUpload),
        fecha_carga: new Date()
      };

      this.kmlRutaService.create(kmlRuta).subscribe(
        (response) => {
          console.log('Documento cargado exitosamente.');
          this.kmls.push(response); // Agregar el KmlRuta al array de kmls
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
        }
      );
    }
  }
}
