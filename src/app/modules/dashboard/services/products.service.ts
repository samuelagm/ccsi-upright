import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.API;
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.url}/product/productStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
  }

  updateProducts(id, update) {
    return this.http.put(`${this.url}/product/updateProduct/?id=${id}`, update);
  }

  createProduct(product) {
    return this.http.post(`${this.url}/product/createProduct`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.url}/product/${id}`);
  }

  getOrders() {
    return this.http.get(`${this.url}/order/orderStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
  }

  updateOrders(id, update) {
    return this.http.put(`${this.url}/order/${id}`, update);
  }

  createOrder(order) {
    return this.http.post(`${this.url}/order/createOrders`, order);
  }

  deleteOrder(id) {
    return this.http.delete(`${this.url}/order/${id}`);
  }

  getSuggestions() {
    return this.http.get(`${this.url}/suggestions/suggestionStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
  }

  updateSuggestions(id, update) {
    return this.http.put(`${this.url}/suggestions/${id}`, update);
  }

  createSuggestion(suggestion) {
    return this.http.post(`${this.url}/suggestions/createSuggestions`, suggestion);
  }

  deleteSuggestion(id) {
    return this.http.delete(`${this.url}/suggestions/${id}`);
  }

  getTestimonials() {
    return this.http.get(`${this.url}/testimonial/testimonialStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
  }

  updateTestimonials(id, update) {
    return this.http.put(`${this.url}/testimonial/${id}`, update);
  }

  createTestimonial(testimonial) {
    return this.http.post(`${this.url}/testimonial/createTestimonial`, testimonial);
  }

  deleteTestimonial(id) {
    return this.http.delete(`${this.url}/testimonial/${id}`);
  }

  getUsers() {
    return this.http.get(`${this.url}/user/usersAndStats`).pipe(map(data => JSON.parse(JSON.stringify(data))));
  }

  updateUsers(id, update) {
    return this.http.put(`${this.url}/user/${id}`, update);
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/user/${id}`);
  }
}
