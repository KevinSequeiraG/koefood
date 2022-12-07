import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    //this.getRoles();
    this.formCreate = this.fb.group({
      id: [null, [Validators.required]],
      //userType: ["USER", [Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      //idRestaurant: [1, [Validators.required]],
    });
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formCreate.invalid) {
      return;
    }
    if (this.formCreate.invalid) {
      return;
    }

    //validar si usuario ya existe
    // this.gService
    //   .get('user/', this.formCreate.get('id').value)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     if (data != null) {
    //       this.notificacion.mensaje(
    //         'Usuario',
    //         'La identificación del usuario ya se encuentra registrada',
    //         TipoMessage.warning
    //       );
    //       return;
    //     } else {
    //       this.authService
    //         .createUser(this.formCreate.value)
    //         .subscribe((respuesta: any) => {
    //           //Redireccionar al loguearse
    //           this.router.navigate(['/usuario/login'], {
    //             //Mostrar mensaje
    //             queryParams: { register: 'true' },
    //           });
    //         });
    //     }
    //   });
    this.gService
      .get('user/validateId', this.formCreate.get('id').value)
      .subscribe((data: any) => {
        if (data != null) {
          this.notificacion.mensaje(
            'Creación de usuarios',
            'La identificación ingresada ya existe',
            TipoMessage.error
          );
          return;
        }
        this.gService
          .get('user/validateemail', this.formCreate.get('email').value)
          .subscribe((data: any) => {
            if (data != null) {
              this.notificacion.mensaje(
                'Creación de usuarios',
                'El correo ingresado ya existe',
                TipoMessage.error
              );
              return;
            }
            this.authService
              .createUser(this.formCreate.value)
              .subscribe((respuesta: any) => {
                //Redireccionar al loguearse
                this.router.navigate(['/usuario/login'], {
                  //Mostrar mensaje
                  queryParams: { register: 'true' },
                });
              });
            // this.notificacion.mensaje(
            //   'Creación de usuarios',
            //   'El usuario ha sido creado satisfactoriamente',
            //   TipoMessage.success
            // );
          });
      });
  }
  onReset() {
    this.formCreate.reset();
  }
  // getRoles() {
  //   this.gService
  //     .list('rol')
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       this.roles = data;
  //       console.log(this.roles);
  //     });
  // }

  // obtenerUsuario(id: any) {
  //   this.gService
  //     .get('user/', this.formCreate.get('id').value)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       this.userAlreadyExists = data != null;
  //     });
  // }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
