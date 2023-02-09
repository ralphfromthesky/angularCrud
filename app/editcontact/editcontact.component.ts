import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Contact } from 'src/app/contact-service/contact'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.css']
})
export class EditcontactComponent implements OnInit {
  id:any;
  data:any;
  contact = new Contact();
  public message: string = "succesfully edited";

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private toaster: ToastrService
  
  ) { }

  ngOnInit(): void {
   // console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.getData();

  }

  getData() {
    this.dataService.updateData(this.id).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.contact = this.data;
    })
  }

updateData() {
  this.dataService.editData(this.id, this.contact).subscribe(res => { });
  this.router.navigate(['/']);
  //alert("updated");
  this.toaster.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
         timeOut: 1000,
        progressBar: true
        });
}
}
