import { Component, OnInit } from '@angular/core';
import { RutaService } from '../ruta.service';
import { Ruta } from '../ruta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexRutaComponent implements OnInit {
  rutas: Ruta[] = [];
  idKmlRuta = Number(this.route.snapshot.paramMap.get('idKmlRuta'));

  constructor(    
    private route: ActivatedRoute,
    public rutaService: RutaService) { }

    ngOnInit(): void {
      this.rutaService.getAll(this.idKmlRuta).subscribe(
        (data: Ruta[]) => {
          this.rutas = data;
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
      });
    }
  }