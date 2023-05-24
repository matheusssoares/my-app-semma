import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, NbMenuModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { DataTablesModule } from "angular-datatables";
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NgxSpinnerModule,
    NbSidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbMenuModule.forRoot(), //for root (funcionar menu)
    TableModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    ButtonModule,
    ToastModule,
    NbToastrModule.forRoot(),
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    SplitButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    CardModule,
    TabViewModule,
    VirtualScrollerModule,
    SidebarModule
  ],
  exports: [
    CommonModule,
    NbLayoutModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NgxMaskModule,
    DataTablesModule,
    ButtonModule,
    ToastModule,
    NbToastrModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    SplitButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    CardModule,
    TabViewModule,
    VirtualScrollerModule,
    SidebarModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
