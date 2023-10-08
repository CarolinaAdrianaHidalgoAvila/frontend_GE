import { Component, OnInit } from '@angular/core';
import { RutaService } from '../ruta.service';
import { Ruta } from '../ruta';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexRutaComponent implements OnInit {
  rutas: Ruta[] = [];
  idKmlRuta = Number(this.route.snapshot.paramMap.get('idKmlRuta'));
  filteredRuta: Ruta[] = [];
  fileToUpload: File | null = null;
  constructor(    
    private route: ActivatedRoute,
    public rutaService: RutaService,
    private router: Router) { }

    ngOnInit(): void {
      this.rutaService.getAll(this.idKmlRuta).subscribe(
        (data: Ruta[]) => {
          this.rutas = data;
          this. filteredRuta = [...this.rutas];
          this. filteredRuta = data.sort((a, b) => a.id - b.id);
          console.log(this.rutas);
        },
        error => {
          console.error('Error al cargar las rutas:', error);
        }
      );
    }
  
    deleteRuta(idRuta: number): void {
      this.rutaService.delete(this.idKmlRuta, idRuta).subscribe(res => {
        this.rutas = this.rutas.filter(item => item.id !== idRuta);
        console.log('Ruta eliminada!');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`/kml-Ruta/index/${this.idKmlRuta}/ruta/index`]);
      });
      });
    }
    filter(filterValue: any) {
      console.log('filterValue:', filterValue);
      if (!filterValue) {
        this.filteredRuta = [...this.rutas];
      } else {
        this.filteredRuta = this.rutas.filter(ruta =>
          ruta.id.toString().includes(filterValue) ||
          ruta.nombre_ruta.toLowerCase().includes(filterValue.toLowerCase()) ||
          ruta.codigo_carro.toLowerCase().includes(filterValue.toLowerCase())||
          (ruta.tiene_saltos ? 'Sí' : 'No').toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }
    handleFileInput(event: any) {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
        this.fileToUpload = files.item(0);
      }
    }

    uploadFile() {
      if (this.fileToUpload) {
        const formData = new FormData();
        formData.append('file', this.fileToUpload);
  
        this.rutaService.uploadFile(formData).subscribe(
          (response) => {
            // Manejar la respuesta del servidor si es necesario
            console.log('Archivo subido exitosamente', response);
          },
          (error) => {
            // Manejar errores en la carga del archivo
            console.error('Error al subir archivo', error);
          }
        );
      }
    }
  }