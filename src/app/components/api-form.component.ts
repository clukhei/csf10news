import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDatabase } from './news.database'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'

@Component({
  selector: 'app-api-form',
  templateUrl: './api-form.component.html',
  styleUrls: ['./api-form.component.css']
})
export class ApiFormComponent implements OnInit {

  apiKey: string = ''
  constructor(private router: Router, private newsDB: NewsDatabase) {

    
  }


  form: FormGroup = new FormGroup({
    api: new FormControl(this.apiKey, [Validators.required])
  })

  ngOnInit(): void {
    this.form
  
    
  }

  goBack() {
    this.router.navigate(['/'])
  }

  alertWC(){
    alert('hello this is a webcomponent')
  }
  focusEvent(){
    console.log('this is a focus event')
  }
  blurEvent(){
    console.log('this is a blur event')
  }

  deleteApi() {
    const api = this.form.get('api').value
    this.newsDB.deleteApi(api)
    this.form.reset()
  }

  saveApi() {
    const api = this.form.get('api').value
    this.newsDB.saveApi(api)
    this.router.navigate(['/'])

  }

}
