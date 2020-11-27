import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-api-form',
  templateUrl: './api-form.component.html',
  styleUrls: ['./api-form.component.css']
})
export class ApiFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    api: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
    this.form
  }

}
