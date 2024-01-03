import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { AssetComponent } from './pages/asset/asset.component';
import { CreateAssetComponent } from './pages/asset/create-asset/create-asset.component';
import { AuthGuard } from './authentication/auth.guard';
import { ListAssetComponent } from './pages/user_view/list-asset/list-asset.component';
import { UpdateComponent } from './pages/asset/update/update.component';
import { ShoppingPlanComponent } from './pages/shopping-plan/shopping-plan.component';
import localeVi from '@angular/common/locales/vi';
import {DatePipe, registerLocaleData} from '@angular/common';
import { CreateShoppingPlanComponent } from './pages/shopping-plan/create-shopping-plan/create-shopping-plan.component';
import { UpdateShoppingPlanComponent } from './pages/shopping-plan/update-shopping-plan/update-shopping-plan.component';
import { UnitComponent } from './pages/unit/unit.component';
import { PlanListComponent } from './pages/plan-list/plan-list.component';
import { CreateUnitComponent } from './pages/unit/create-unit/create-unit.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { CreateSupplierComponent } from './pages/supplier/create-supplier/create-supplier.component';
import { CreatePlanListComponent } from './pages/plan-list/create-plan-list/create-plan-list.component';
import { AddToAssetComponent } from './pages/shopping-plan/add-to-asset/add-to-asset.component';
import { CurrencyFormatPipe } from './common/CurrencyFormatPipe';
import { CreatePlanListDetailComponent } from './pages/plan-list/create-plan-list-detail/create-plan-list-detail.component';
import { ProductTypeComponent } from './pages/product-type/product-type.component';
import { CreateProductTypeComponent } from './pages/product-type/create-product-type/create-product-type.component';
import { CreateProductTypeDetailComponent } from './pages/product-type/create-product-type-detail/create-product-type-detail.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { CreateCurrencyComponent } from './pages/currency/create-currency/create-currency.component';
import { SearchShoppingPlanComponent } from './pages/shopping-plan/search-shopping-plan/search-shopping-plan.component';
import { UpdateCurrencyComponent } from './pages/currency/update-currency/update-currency.component';
import { UpdateSupplierComponent } from './pages/supplier/update-supplier/update-supplier.component';
import { UpdateUnitComponent } from './pages/unit/update-unit/update-unit.component';
import { UpdateProductTypeComponent } from './pages/product-type/update-product-type/update-product-type.component';
import { UpdateProductTypeDetailComponent } from './pages/product-type/update-product-type-detail/update-product-type-detail.component';
import { UpdatePlanListComponent } from './pages/plan-list/update-plan-list/update-plan-list.component';
import { UpdatePlanListDetailComponent } from './pages/plan-list/update-plan-list-detail/update-plan-list-detail.component';
import { ViewAssetModalComponent } from './pages/asset/view-asset-modal/view-asset-modal.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ViewShoppingPlanComponent } from './pages/shopping-plan/view-shopping-plan/view-shopping-plan.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchAssetComponent } from './pages/asset/search-asset/search-asset.component';

registerLocaleData(localeVi, 'vi-VN');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    CreateUserComponent,
    AssetComponent,
    CreateAssetComponent,
    ListAssetComponent,
    UpdateComponent,
    ShoppingPlanComponent,
    CreateShoppingPlanComponent,
    UpdateShoppingPlanComponent,
    UnitComponent,
    PlanListComponent,
    CreateUnitComponent,
    SupplierComponent,
    CreateSupplierComponent,
    CreatePlanListComponent,
    AddToAssetComponent,
    CurrencyFormatPipe,
    CreatePlanListDetailComponent,
    ProductTypeComponent,
    CreateProductTypeComponent,
    CreateProductTypeDetailComponent,
    CurrencyComponent,
    CreateCurrencyComponent,
    SearchShoppingPlanComponent,
    UpdateCurrencyComponent,
    UpdateSupplierComponent,
    UpdateUnitComponent,
    UpdateProductTypeComponent,
    UpdateProductTypeDetailComponent,
    UpdatePlanListComponent,
    UpdatePlanListDetailComponent,
    ViewAssetModalComponent,
    ForgotPasswordComponent,
    ViewShoppingPlanComponent,
    SearchAssetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [CdkColumnDef, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
