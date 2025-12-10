import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isSubmitted = false;
  cartItems: any[] = [];
  productPrices: { [key: string]: number } = {
    'Pencil': 2,
    'Sharpner': 5,
    'Eraser': 3,
    'Scale': 8,
    'Pen': 10
  };
  productForm = new FormGroup({
    product: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    status: new FormControl('')
  });
  status: string = 'pending';
  users = [
    { id: 1, name: "Aaryan"},
    { id: 2, name: "Arush"},
    { id: 3, name: "Kirti"},
    { id: 4, name: "Laksh"}
  ]
  submit() {
    if(this.productForm.valid) {
      const product = this.productForm.value.product!;
      const quantity = this.productForm.value.quantity!;
      // @ts-ignore
      const cost = this.productPrices[product] * quantity;
      const newItem = {
        id: Date.now(),
        product: product,
        quantity: quantity,
        cost: cost,
        status: this.productForm.value.status || null
      };
      this.cartItems.push(newItem);
      this.productForm.reset();
      this.isSubmitted = false;
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + item.cost, 0);
  }

  removeUser(id: Number) {
    this.users = this.users.filter(u => u.id != id)
  }

  changeStatus(newStatus: string) {
    this.status = newStatus;
  }


  loadData() {
    console.log('heavy content loaded')
  }
}
