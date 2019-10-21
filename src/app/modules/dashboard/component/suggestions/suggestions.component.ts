import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  suggestionsData: any = {};
  loading: boolean;
  constructor(private service: ProductsService, private builder: FormBuilder) {
    this.loading = true;
  }

  getSuggestions() {
    this.loading = true;
    this.service.getSuggestions().subscribe(res => {
      this.loading = false;
      this.suggestionsData = res;
    }, err => {
      this.loading = false;
      alert("Ooop a network error occcured and suggestions couldn't be retrieved");
      console.dir(err);
    })
  }

  ngOnInit() {
    this.getSuggestions();
  }

}
