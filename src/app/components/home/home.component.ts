import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products:Product[] = [];
  currentPage:number = 1;
  itemsPerPage:number = 10;
  pages:number[] = [];
  totalPages:number = 0;
  visiblePages:number[] =[];

  constructor(private productSevice:ProductService){}


  ngOnInit(){
    this.getProducts(this.currentPage,this.itemsPerPage);
  }

  getProducts(page: number, limit: number) {
    this.productSevice.getProducts(page, limit).subscribe({
      next: (response: any) => {
        debugger
        response.products.forEach((product: Product) => {
          product.url = `${environment.apiUrl}/product/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage,this.totalPages);
      },
      complete() {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error:', error);
      }
    });
  }
  
  onPageChange(page:number){
    debugger
    this.currentPage = page;
    this.getProducts(this.currentPage,this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage:number,totalPages:number): number[]{
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if(endPage - startPage + 1 < maxVisiblePages){
      startPage = Math.max(endPage - maxVisiblePages + 1,1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_,index) => startPage + index);
  }

}
