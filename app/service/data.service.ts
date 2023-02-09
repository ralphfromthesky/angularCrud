import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  registerUser(data) {
    return this.httpClient.post(environment.apiUrl + '/api/register/', data);
  }

  login(data) {
    return this.httpClient.post(environment.apiUrl + '/api/login/', data);
  }

  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/contacts');
  }

  insertData(data) {
    return this.httpClient.post('http://127.0.0.1:8000/api/save_contact', data);
  }

  deleteData(id) {
    return this.httpClient.delete
      ('http://127.0.0.1:8000/api/delete_contact/' + id);
  }

  updateData(id) {
    return this.httpClient.get('http://127.0.0.1:8000/api/get_contact/' + id);
  }

  editData(id, data) {
    return this.httpClient.post('http://127.0.0.1:8000/api/update_contact/' +id, data);
   }
}
