import { Component, OnInit } from '@angular/core';

import { TutorialService } from '../tutorial.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  constructor(
    public tutorialService: TutorialService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const fechaActual = new Date();
    this.form = new FormGroup({
      titulo:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      url_contenido:  new FormControl('', [ Validators.required ]),
      fecha_carga: new FormControl(fechaActual),
      fecha_modificacion:new FormControl(fechaActual)
    });

  }
  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.tutorialService.create(this.form.value).subscribe(res => {
         console.log('Tutorial created successfully!');
         this.router.navigateByUrl('videos/index');
    })
  }

}