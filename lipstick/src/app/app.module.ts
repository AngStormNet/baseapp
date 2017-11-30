import { NgModule } from '@angular/core';
import {
    MaterialModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdInputModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressSpinnerModule,
    MdTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import {
    AdminGuard,
    AuthGuard,
} from './_guards/index';
import {
    AdminDetailComponent,
    AdminListComponent,
} from './admin/index';
import {
    AdminService,
    AlertService,
    ArrayService,
    AuthenticationService,
    DownloadService,
    MessageService,
    SettingService,
    UserService,
    ValuelistService,
} from './_services/index';
import {
    AccountEdit,
    AccountList,
} from './account/index';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ModalComponent } from './app-modal.component';
import { UsermenuComponent } from './usermenu/usermenu.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        DragulaModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdDialogModule,
        MdInputModule,
        MdMenuModule,
        MdNativeDateModule,
        MdProgressSpinnerModule,
        MdTooltipModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        routing,
    ],
    declarations: [
        AccountEdit,
        AccountList,
        AdminDetailComponent,
        AdminListComponent,
        AdminmenuComponent,
        AlertComponent,
        AppComponent,
        HomeComponent,
        LoginComponent,
        ModalComponent,
        UsermenuComponent,
    ],
    providers: [
        AdminGuard,
        AdminService,
        AlertService,
        ArrayService,
        AuthenticationService,
        AuthGuard,
        DownloadService,
        MessageService,
        SettingService,
        UserService,
        ValuelistService,
    ],
    entryComponents: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
