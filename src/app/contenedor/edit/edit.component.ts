import { Component, OnInit} from '@angular/core';
import { ContenedorService } from '../contenedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Contenedor } from '../contenedor';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  idKmlContenedor:number =0;
  contenedor!: Contenedor;
  form!: FormGroup;

  constructor(
    public contenedorService: ContenedorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    const fechaActual = new Date();
    this.id = this.route.snapshot.params['idContenedor'];
    this.idKmlContenedor = this.route.snapshot.params['idKmlContenedor'];
    this.contenedorService.find(this.idKmlContenedor, this.id).subscribe(
      (data: Contenedor) => {
          this.contenedor = data;
          console.log('Contenedor encontrado:', this.contenedor);
      },
      (error) => {
          console.error('Error al encontrar el contenedor:', error);
      }
  );
    this.form = new FormGroup({
      nombre_contenedor:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      latitud: new FormControl('', [ Validators.required]),
      longitud: new FormControl('', [ Validators.required ]),
      fecha_modificacion: new FormControl(fechaActual),
      tipo: new FormControl('', [Validators.required])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.contenedorService.update(this.idKmlContenedor,this.id, this.form.value).subscribe(res => {
         console.log('Contenedor updated successfully!');
         this.router.navigateByUrl(`kml-Contenedor/index/${this.idKmlContenedor}/contenedor/index`);
        })
  }

}
