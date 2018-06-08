import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-starwars',
  templateUrl: './starwars.component.html',
  styleUrls: ['./starwars.component.css']
})
export class StarwarsComponent implements OnInit {
  selectedSpaceship: any;
  options = new RequestOptions({ withCredentials: true });
  spaceships: any;
  baseUrl = 'http://localhost:8080/';
  newSpaceship: any = {
denomination: '',
passengers: '',
crew: '',
cargo_capacity: '',
lengthiness: '',
max_atmosphering_speed: '',
manufacturer: '',
cost_in_credits: '',
model: '',
  };

  constructor(public http: Http) { }

  ngOnInit() {
    this.list();
  }
  list() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.spaceships = JSON.parse(data['_body']);
      });
  }
  editSpaceship(spaceship) {
    this.selectedSpaceship = spaceship;
    this.http.put(`http://localhost:8080/${this.selectedSpaceship['_id']}`, this.selectedSpaceship, this.options)
      .subscribe(data => {
        setTimeout(this.list(), 300);
      });
  }

  removeSpaceship(spaceship) {
      this.http.delete(`http://localhost:8080/${spaceship['_id']}`, this.options)
      .subscribe(data => {
        setTimeout(this.list(), 300);
      });
  }
  addSpaceShip() {
    this.http.post(`http://localhost:8080/`, this.newSpaceship, this.options)
    .subscribe(data => {
      setTimeout(this.list(), 300);
    });
  }
}
