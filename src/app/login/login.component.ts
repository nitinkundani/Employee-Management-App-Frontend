import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

//import { RegisterLoginService } from '../shared/register-login.service';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  submitted = false;
  loginForm!: UntypedFormGroup;

  constructor(private _router:Router, private employeeService:EmployeeService, private formBuilder: UntypedFormBuilder) {
    
   }

  /* loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    //password:new FormControl(null, Validators.required)
  }); */

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$") ]],
      password: ['', [Validators.required]]
  });

  }

  get f() { return this.loginForm.controls; }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  onSubmit() {
    // console.log(JSON.stringify(this.loginForm.value));

    this.submitted= true;
    if (this.loginForm.invalid) {
      return;
    }

    this.employeeService.login((this.loginForm.value))
    .subscribe(
      data=>{
       /*  var updatedData = data as JSON;
        var tokenString: any = updatedData['token'];  */
        this.employeeService.setToken(data as string);
        console.log(data);
        //console.log('Form username value: '+form.value.username);
        //this.employeeService.loggedInUsername = form.value.username;
        this.employeeService.setLoggedInUserEmail(this.loginForm.value.email);
        console.log('Service loggedInUsername: '+this.employeeService.getLoggedInUserEmail());
        //localStorage.setItem('token', data['token']);
        //console.log('Data in local storage: '+localStorage.getItem('token'));
        this._router.navigate(['/home']);
        //this.employeeService.clearSelectedEmployee();
      } ,
      (error)=>{
        console.error(error);
        if(error.status == 400){
          console.log(error.error['msg']);
        M.toast({ html: error.error['msg'], classes: 'rounded' });
        }
      }
    )
  }

}
