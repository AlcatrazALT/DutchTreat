﻿import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"
import { Order, OrderItem } from './order'
import { Product } from './product'

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    public products: Product[] = []

    public order: Order = new Order()

    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            .pipe(map((data: []) => {
                this.products = data
                return true
            }))
    }

    public addToOrder(newProduct: Product) {
        let item: OrderItem = this.order.items.find(i => i.productId == newProduct.id)

        if (item) {
            item.quantity++
        } else {
            item = new OrderItem()
            item.productId = newProduct.id
            item.productArtist = newProduct.artist
            item.productArtId = newProduct.artId
            item.productCategory = newProduct.category
            item.productSize = newProduct.size
            item.productTitle = newProduct.title
            item.unitPrice = newProduct.price
            item.quantity = 1

            this.order.items.push(item)
        }
    }
}