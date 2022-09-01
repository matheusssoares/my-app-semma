import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  public date = format(new Date(), 'yyyy', { locale: pt });

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  async createAccount(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(() => {
        resolve('success');
      }).catch((err) => {
        reject(err.code);
      })
    })
  }

  generateNumberProtocol(collection: string) {
    return new Promise((resolve) => {
      this.db.collection(collection, ref => ref.limit(1).orderBy('protocolo', 'desc'))
        .valueChanges().subscribe((data: any) => {
          if (data.length) {
            const number: string = `${data[0].protocolo}`;

            let digitosyear = number.substring(0, 4);

            if (digitosyear == this.date) {
              resolve(data[0].protocolo + 1);
            } else {
              let number = `${this.date}001`;
              resolve(Number(number));
            }

          } else {
            let number = `${this.date}001`;
            resolve(Number(number));
          }
        })
    })
  }

  create(collection: string, data: any, id: any) {
    let key = (id) ? id : this.generateKey();

    return new Promise((resolve, reject) => {
      this.db.collection(`${collection}`).doc(key).set(data).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err);
      })
    })
  }

  getDataByOrder(collection: string) {
    return new Promise((resolve) => {
      this.db.collection(collection, ref => ref.orderBy('protocolo', 'desc')).valueChanges()
      .subscribe((data: any) => {
        resolve(data);
      })
    })
  }

  generateKey(): string {
    return this.db.createId();
  }
}
