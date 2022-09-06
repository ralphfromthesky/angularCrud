import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.css'],
})
export class EditcontactComponent implements OnInit {
  id: any;
  data: any;
  contact = new Contact();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  getData() {
    this.dataService.updateData(this.id).subscribe((res) => {
      //console.log(res);
      this.data = res;
      this.contact = this.data;
    });
  }

  updateData() {
    this.dataService.editData(this.id, this.contact).subscribe((res) => {
      alert('succesfully edited');
    });
  }
}
