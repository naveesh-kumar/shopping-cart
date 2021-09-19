import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormUtilitiesService } from '../../../../services/Formutilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorObj: any = {};
  showPassword: boolean;
  userForm: FormGroup;

  formErrors: any = {
    username: '',
    password: '',
  };

  constructor(
    private FormUtilitiesService: FormUtilitiesService,
    private route: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.showPassword = false;
    this.userForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.updateValidationMessages();
    });
  }

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        this.FormUtilitiesService.shouldHaveOneSpecialCharacter,
      ]),
    });
  }

  updateValidationMessages() {
    this.formErrors = this.FormUtilitiesService.updateValidationMessages(
      this.userForm,
      this.formErrors
    );
  }

  login() {
    if (!this.userForm.valid) alert('Please enter all fields');
    else {
      let _username = this.userForm.get('username')?.value;
      let _password = this.userForm.get('password')?.value;

      this.usersService.userLogin(_username, _password).subscribe((user) => {
        if (user) {
          this.activatedRoute.queryParamMap.subscribe((data: any) => {
            if (data.params.returnUrl)
              this.route.navigate([data.params.returnUrl]);
            this.route.navigate(['home']);
          });
        } else {
          window.alert('Wrong Credentials');
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
