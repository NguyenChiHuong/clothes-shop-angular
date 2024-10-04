import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './components/home/home.component';
import {OrderComponent} from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [LoginComponent],
})
export class AppServerModule {}
