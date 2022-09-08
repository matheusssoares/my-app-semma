import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, NbMenuModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskModule } from 'ngx-mask'
import { DataTablesModule } from "angular-datatables";
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
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
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    NgxMaskModule.forRoot(),
    DataTablesModule,
    ButtonModule,
    ToastModule,
    NbToastrModule.forRoot(),
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    SplitButtonModule
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
    NgxEditorModule,
    NgxMaskModule,
    DataTablesModule,
    ButtonModule,
    ToastModule,
    NbToastrModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    SplitButtonModule
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
