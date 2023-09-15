import { Component, OnInit } from '@angular/core';
import { ContenedorService } from '../contenedor.service';
import { Contenedor } from '../contenedor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexContenedorComponent implements OnInit {
  contenedores: Contenedor[] = [];
  idKmlContenedor = Number(this.route.snapshot.paramMap.get('idKmlContenedor'));

  filteredContenedores: Contenedor[] = [];

  constructor(    
    private route: ActivatedRoute,
    public contenedorService: ContenedorService) { }

    ngOnInit(): void {
      this.contenedorService.getAll(this.idKmlContenedor).subscribe(
        (data: Contenedor[]) => {
          this.contenedores = data;
          this. filteredContenedores = [...this.contenedores];
          this. filteredContenedores = data.sort((a, b) => a.id - b.id);
          console.log(this.contenedores);
        },
        error => {
          console.error('Error al cargar los contenedores:', error);
        }
      );
    }
  
    deleteContenedor(idContenedor: number): void {
      this.contenedorService.delete(this.idKmlContenedor, idContenedor).subscribe(res => {
        this.contenedores = this.contenedores.filter(item => item.id !== idContenedor);
        console.log('Contenedor deleted successfully!');
      });
    }
    filter(filterValue: any) {
      console.log('filterValue:', filterValue);
      if (!filterValue) {
        this.filteredContenedores = [...this.contenedores];
      } else {
        this.filteredContenedores = this.contenedores.filter(contenedor =>
          contenedor.id.toString().includes(filterValue) ||
          contenedor.nombre_contenedor.toLowerCase().includes(filterValue.toLowerCase()) ||
          contenedor.tipo.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }
  }




