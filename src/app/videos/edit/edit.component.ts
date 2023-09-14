import { Component, OnInit } from '@angular/core';

import { TutorialService } from '../tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Tutorial } from '../tutorial';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id_tutorial!: number;
  titulo!: string;
  url_contenido!: string;
  tutorial!: Tutorial;
  form!: FormGroup;

  mensaje = 'La información fue actualizada correctamente.';
  mostrarMensaje: boolean = false;

  constructor(
    public tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 22000);
    this.id_tutorial = this.route.snapshot.params['idTutorial'];
    this.tutorialService.find(this.id_tutorial).subscribe((data: Tutorial)=>{
      this.tutorial = data;
    });

    this.form = new FormGroup({
      titulo:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      url_contenido:  new FormControl('', [ Validators.required ]),
      fecha_modificacion: new FormControl(new Date())
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.tutorialService.update(this.id_tutorial, this.form.value).subscribe(res => {
         console.log('Tutorial updated successfully!');
         this.router.navigateByUrl('videos/index');
    })
  }

}

