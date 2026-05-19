import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';
import { AuthService } from '../../core/services/auth';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class UsersComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  users: User[] = [];
  isLoading = true;
  showAddForm = false;
  showEditForm = false;

  // Pattern: at least 8 chars, 1 upper, 1 lower, 1 number
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  userForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    estatus: [true, Validators.required],
    rol: this.fb.group({
      idRol: [2, Validators.required] // Default to ALMACEN
    })
  });

  editForm: FormGroup = this.fb.group({
    idUsuario: [null],
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.pattern(this.passwordPattern)]], // Optional on edit
    estatus: [true, Validators.required],
    rol: this.fb.group({
      idRol: [2, Validators.required]
    })
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.listar().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  openAddModal() {
    this.userForm.reset({ estatus: true, rol: { idRol: 2 } });
    this.showAddForm = true;
    this.cdr.detectChanges();
  }

  openEditModal(user: User) {
    this.editForm.patchValue({
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      correo: user.correo,
      estatus: user.estatus,
      rol: { idRol: user.rol?.idRol || 2 }
    });
    this.editForm.get('contrasena')?.reset();
    this.showEditForm = true;
    this.cdr.detectChanges();
  }

  onAddSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.guardar(newUser).subscribe({
        next: () => {
          this.showAddForm = false;
          this.loadUsers();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onEditSubmit() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
      if (!updatedUser.contrasena) {
        delete updatedUser.contrasena;
      }
      this.userService.actualizar(updatedUser).subscribe({
        next: () => {
          this.showEditForm = false;
          this.loadUsers();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
