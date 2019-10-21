import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonialsData: any = {};
  loading: boolean;
  constructor(private service: ProductsService, private builder: FormBuilder) {
    this.loading = true;
  }

  getTestimonials() {
    this.loading = true;
    this.service.getTestimonials().subscribe(res => {
      this.loading = false;
      this.testimonialsData = res;
    }, err => {
      this.loading = false;
      alert("Ooop a network error occcured and testimonials couldn't be retrieved");
      console.dir(err);
    })
  }

  ngOnInit() {
    this.getTestimonials();
  }

}
