import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/contact-service/contact';
import jwt_decode from 'jwt-decode';
import { DataService } from '../service/data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  contacts: any;
  contact = new Contact();
  token: any;
  userData: any;
  email: any;
  public form: FormGroup;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    console.log('this.token');
    console.log(this.userData.email);
    this.getContactsData();

    this.form =  new FormGroup({
      facility_number: new FormControl(''),
      facility: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      fax: new FormControl(''),
      web_url: new FormControl('')
    })

  }

  getContactsData() {
    this.dataService.getData().subscribe((res) => {
      console.log(res);
      this.contacts = res;
    });
  }

  insertData() {
    this.dataService.insertData(this.contact).subscribe((res) => {
      this.getContactsData();
      alert('Save Successfully');
      this.form.reset();
    });
  }

  deleteData(id) {
    this.dataService.deleteData(id).subscribe((res) => {
      this.getContactsData();
      alert('Item Deleted');
    });

    console.log(id);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
