import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ControllerService } from 'src/app/services/controller.service';
import { LanguageApp } from 'src/app/models/lang.datatable';
import { Subject } from 'rxjs';
import { Denuncias } from 'src/app/models/denuncias.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dados: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private db: AngularFirestore,
    private controller: ControllerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.portugues_datatables
    };
    //this.controller.generateNumberProtocol('denuncias');
    this.loadData();
  }

  openDialog() {

  }

  async loadData() {
    try {
      this.spinner.show();

      this.db.collection('denuncias', ref => ref.orderBy('protocolo', 'desc')).valueChanges()
      .subscribe((data) => {
        data.forEach((item: any) => {
          this.dados.push(item)          
        })
        
      })

      /* const data = await this.controller.getDataByOrder('denuncias');

      this.dados = data;

      this.dtTrigger.next(null); */
      
      
      this.spinner.hide();
    } catch (err) {

    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
