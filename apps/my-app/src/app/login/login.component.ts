import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Store,Select } from '@ngxs/store';
import { SetToken, AppState  } from '../shared/state/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  @Select(AppState.getToken) token$: Observable<string> | undefined;

  constructor(private fb: FormBuilder, private store: Store, private router: Router){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.token$?.subscribe(token => {
      if (token) {
        this.router.navigate(['/users']); // Redirect to users page if token exists
      }
    });
  }

  onSubmit(){
    if(this.loginForm?.valid){
      // Simulation of a success login and displatch token to state 
      const token = 'thisIsAToken'
      this.store.dispatch(new SetToken(token));
      console.log('Welcome!: ', this.loginForm.value);
    }
  }
}
