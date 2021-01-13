import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Order, OrderItem } from './order';
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.products = [];
        this.order = new Order();
    }
    loadProducts() {
        return this.http.get("/api/products")
            .pipe(map((data) => {
            this.products = data;
            return true;
        }));
    }
    addToOrder(newProduct) {
        let item = this.order.items.find(i => i.productId == newProduct.id);
        if (item) {
            item.quantity++;
        }
        else {
            item = new OrderItem();
            item.productId = newProduct.id;
            item.productArtist = newProduct.artist;
            item.productArtId = newProduct.artId;
            item.productCategory = newProduct.category;
            item.productSize = newProduct.size;
            item.productTitle = newProduct.title;
            item.unitPrice = newProduct.price;
            item.quantity = 1;
            this.order.items.push(item);
        }
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map