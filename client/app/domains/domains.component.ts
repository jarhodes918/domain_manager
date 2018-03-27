import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { DomainService } from '../services/domain.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Domain } from '../shared/models/domain.model';
import { Credential } from '../shared/models/credential.model';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domain = new Domain();
  domains: Domain[] = [];
  credential = new Domain();
  credentials: Credential[] = [];
  isLoading = true;
  isEditing = false;
  showcredentials = false;

  addDomainForm: FormGroup;
  name = new FormControl('', Validators.required);

  addCredentialsForm: FormGroup;
  cusername = new FormControl('', Validators.required);
  cpassword = new FormControl('', Validators.required);

  constructor(private domainService: DomainService,
			  private auth: AuthService,              
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getDomains(this.auth.currentUser.username);
    this.addDomainForm = this.formBuilder.group({
      name: this.name
    });
    this.addCredentialsForm = this.formBuilder.group({
      cusername: this.cusername,
	  cpassword: this.cpassword
    });
  }
 
  getDomains(user) {
    this.domainService.getDomains(user).subscribe(
      data => this.domains = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getDomain(userdomain) {
    this.domainService.getDomainByUser(userdomain).subscribe(
      data => this.domain = data,
      error => console.log(error),
      () => this.isLoading = false
    );
	
  }

  addDomain() {

	var domain = new Domain();

	domain.name = this.addDomainForm.controls["name"].value;
	domain.creator = this.auth.currentUser.username;
	
	console.log(domain);	  

    this.domainService.addDomain(domain).subscribe(
      res => {
        this.domains.push(res);
        this.addDomainForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableDomainEditing(domain: Domain) {
    this.isEditing = true;
    this.domain = domain;
  }

  cancelDomainEditing() {
    this.isEditing = false;
    this.domain = new Domain();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the domains to reset the editing
    this.getDomains(this.auth.currentUser.username);
  }

  editDomain(domain: Domain) {
    this.domainService.editDomain(domain).subscribe(
      () => {
        this.isEditing = false;
        this.domain = domain;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDomain() {
	  	 var domain = new Domain();
		 
		 domain._id = document.getElementById("delDomain").value;
		 
		 
	  console.log("helloid" + domain._id);
	
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.domainService.deleteDomain(domain).subscribe(
        () => {
          const pos = this.domains.map(elem => elem._id).indexOf(domain._id);
          this.domains.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  getCredentials(userdomain) {

	  if (userdomain == "page") {
		  userdomain = this.auth.currentUser.username + "-" + document.getElementById("tdDomain").value;
	  }
	  
     this.domainService.getCredentials(userdomain).subscribe(
      data => this.credentials = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCredentials() {

	var credential = new Credential();

	credential.username = this.addCredentialsForm.controls["cusername"].value;
	credential.password = this.addCredentialsForm.controls["cpassword"].value;
	credential.domain = document.getElementById("tdDomain").value;
	credential.creator = this.auth.currentUser.username;
	
	console.log(credential);	 
 
    this.domainService.addCredentials(credential).subscribe(
      res => {
        this.credentials.push(res);
        this.addCredentialsForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableCredentialEditing(credential: Credential) {
    this.isEditing = true;
    this.credential = credential;
  }

  cancelCredentialEditing() {
    this.isEditing = false;
    this.credential = new Credential();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the credentials to reset the editing
    this.getCredentials(this.auth.currentUser.username + "-" + this.domain);
  }

  editCredential(credential: Credential) {
    this.domainService.editCredential(credential).subscribe(
      () => {
        this.isEditing = false;
        this.credential = credential;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCredential(credential: Credential) {

	console.log(credential);	  

    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.domainService.deleteCredential(credential).subscribe(
        () => {
          const pos = this.credentials.map(elem => elem._id).indexOf(credential._id);
          this.credentials.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  toggleShowHide() {
	  this.showcredentials = !this.showcredentials;
  }

}
