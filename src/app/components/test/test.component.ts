import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  template: '<button (click)="sendRequest()">Send Request</button>',
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  sendRequest() {
    this.http.post('http://localhost:5555/api/authentication/sign-up', {
      username: 'testuser',
      password: 'testpassword',
      nombre: 'Test User',
      email: 'testuser@example.com'
    }).subscribe(
      response => console.log('Response:', response),
      error => console.error('Error:', error)
    );
  }
}

