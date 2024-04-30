import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product, ProductsService } from '../services/products.service';
import {MercadoService, Market, newMarket} from '../services/mercado.service';
import { addIcons } from 'ionicons';
import { trashOutline, addOutline, createOutline} from 'ionicons/icons';
import { marketLocals, Localidades } from '../../interfaces/localidades.interfaces'


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductListPage implements OnInit {

  products: Product[] = [];
  locales: Localidades[] = [];

  productsService = inject(ProductsService);
  mercadoService = inject(MercadoService);

  constructor(
  ) { 
    addIcons({trashOutline, addOutline, createOutline});
  }

  async ngOnInit() {
    this.getLocales();
    // const response = await this.productsService.getAll();
    // this.products = response.results;
  }

  //ver locales
  async getLocales() {
    const response = await this.mercadoService.getAllLocals();
    this.locales = response.data;
    console.log(this.locales);
  }

  //new local
  newLocal(isOpen: boolean) {
    console.log('new local', isOpen);
  }

}
