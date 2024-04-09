import { Component, OnInit } from '@angular/core';
import { KmlContenedorService } from '../kml-contenedor.service';
import { KmlContenedor } from '../kml-contenedor';
import { Contenedor } from '../../contenedor/contenedor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  kmls: KmlContenedor[] = [];
  fileToUpload: File | null = null;
  idKmlContenedor: number=0;
  filteredArchivos: KmlContenedor[] = [];

  mensaje = 'Los datos fueron extraidos correctamente.';
  mostrarMensaje: boolean = false;
  mensajeDuracion: number = 6000;
  constructor(
    public kmlContenedorService: KmlContenedorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.kmlContenedorService.getAll().subscribe((data: KmlContenedor[])=>{
      this.kmls = data;
      this.filteredArchivos = [...this.kmls];
      this.filteredArchivos = data.sort((a, b) => a.id - b.id);
      console.log(this.kmls);
    })
  }

  deleteKML(id:number){
    this.kmlContenedorService.delete(id).subscribe(res => {
         this.kmls = this.kmls.filter(item => item.id !== id);
         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/kml-Contenedor/index']);
        });
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
          this.kmls.push(response); 
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/kml-Contenedor/index']);
          });
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
  
  submit(idKmlContenedor: number) {
    this.mostrarMensaje = true;
    this.mensaje = 'Datos del archivo KML procesados y guardados correctamente.';
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, this.mensajeDuracion);
    const newContenedor: Contenedor = {
        id: 0,
        nombre_contenedor: 'Nuevo Contenedor',
        latitud: 0,
        longitud: 0,
        fecha_modificacion: new Date(),
        tipo: 'Tipo de Contenedor',
        idKmlContenedor: idKmlContenedor
    };

    this.kmlContenedorService.createContenedor(idKmlContenedor, newContenedor).subscribe(
        (res: any) => {
            console.log('Datos del archivo KML procesados y guardados correctamente:', res);
        },
        (error) => {
            console.error('Error al procesar datos del archivo KML:', error);
        }
    );
}

filter(filterValue: any) {
  console.log('filterValue:', filterValue);
  if (!filterValue) {
    this.filteredArchivos = [...this.kmls];
  } else {
    this.filteredArchivos = this.kmls.filter(kml =>
      kml.id.toString().includes(filterValue) ||
      kml.nombre_archivo.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
}
