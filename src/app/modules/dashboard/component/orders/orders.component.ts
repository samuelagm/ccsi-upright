import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderData: any = {};
  loading: boolean;
  constructor(private service: ProductsService, private builder: FormBuilder) {
    this.loading = true;
  }
  
  filterOrder(key: string = "undelivered", orders: Array<any>) {
    if (!orders.length) {
      return [];
    }
    if (key === 'delivered') {
      return orders.filter(it => it.hasBeenDelivered);
    }
    return orders.filter(it => !it.hasBeenDelivered);
  }

  getOrders() {
    this.loading = true;
    this.service.getOrders().subscribe(res => {
      this.loading = false;
      this.orderData = res;
    }, err => {
      this.loading = false;
      alert("Ooop a network error occcured and orders couldn't be retrieved");
      console.dir(err);
    })
  }

  ngOnInit() {
    this.getOrders();
  }

  markAsDelivered(order) {
    this.loading = true;
    const updatedOrder = Object.assign(order, { hasBeenDelivered: true, deliveredOn: new Date() });
    this.service.updateOrders(order.id, { hasBeenDelivered: true, deliveredOn: new Date() }).subscribe(data => {
      console.dir(data);
      this.loading = false;
      this.orderData.delivered++;
      this.orderData.orders[this.orderData.orders.indexOf(this.orderData.orders.find(it => it.id === order.id))] = updatedOrder;
    }, err => {
      this.loading = false;
      console.dir(err);
      alert(`Ooops a network error occcured and we couldn't update order`);
    })
  }

}
