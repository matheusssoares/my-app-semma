import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';
import { finalize } from 'rxjs';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  public date = format(new Date(), 'yyyy', { locale: pt });

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) { }

  async createAccount(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
        //resolve('success');
        let data = {
          key: user.user?.uid,
          message: 'success'
        };

        resolve(data);
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

  getDataByOrderFull(collection: string, nomeDoCampo: string, ordemLista: any) {
    return this.db.collection(collection, ref => ref.orderBy(nomeDoCampo, ordemLista)).valueChanges();
  }

  updateData(collection: string, data: any, id: string) {
    data.update_in = new Date();
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(id).update(data).then(() => {
        resolve('success');
      }).catch((err) => {
        console.log(err);
        reject('error')
      })
    })
  }

  delete(collection: string, key: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(key).delete().then(() => {
        resolve('success');
      }).catch((err) => {
        console.log('error =>', err);
        reject(err);
      })
    })
  }

  getDataById(collection: string, campo: string, key: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection, ref => ref.where(campo, '==', key)).valueChanges()
      .subscribe((data: any) => {
        if(data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
    })
  }

  uploadFiles(file: any) {
    return new Promise((resolve, reject) => {
      const filePath = `imagens/${this.generateKey()}.jpg`;

      // Referência ao local de armazenamento no Firebase
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(
            (url) => {
              resolve(url);
            },
            (error) => {
              reject('Ocorreu um erro ao obter a URL da imagem.');
            }
          );
        })
      )
      .subscribe();

    })
  }

  async getDataAllRifas(collection: string) {
    return this.db.collection(collection, ref => ref.orderBy('dataFim', 'desc')).valueChanges();
  }
}
