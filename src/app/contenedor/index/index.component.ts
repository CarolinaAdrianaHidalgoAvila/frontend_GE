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

  constructor(    
    private route: ActivatedRoute,
    public contenedorService: ContenedorService) { }

    ngOnInit(): void {
      //this.idKmlContenedor = Number(this.route.snapshot.paramMap.get('idKmlContenedor'));
      this.contenedorService.getAll(this.idKmlContenedor).subscribe(
        (data: Contenedor[]) => {
          this.contenedores = data;
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
  }




