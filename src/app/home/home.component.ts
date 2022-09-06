import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Contact } from 'src/app/contact'
import jwt_decode from 'jwt-decode';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
contacts:any;
contact = new Contact;
token:any;
userData:any;
email:any;


  constructor(private router: Router,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    console.log('this.token');
    console.log(this.userData.email);
    this.getContactsData();
  }

getContactsData() {
  this.dataService.getData().subscribe(res =>{
    console.log(res);
    this.contacts = res;
  });
}


insertData() {
  // this.dataService.insertData(this.contact).subscribe(res => {
  //   console.log(res);
    
  // })
  //console.log(this.contact);
  this.dataService.insertData(this.contact).subscribe(res => {
    this.getContactsData();
    console.log(res);
    alert('Added Successfully')
  })
}

deleteData(id) {
this.dataService.deleteData(id).subscribe(res => {
  this.getContactsData();
  alert('Nabura na Po');
})

console.log(id);
}


  logout () {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
