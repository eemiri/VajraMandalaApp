import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  signUp(email: string, password: string): Observable<User> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => {
        const newUser: User = { uid: user?.uid, email, role: 'user', approved: false };
        return from(this.db.collection('users').doc(user?.uid).set(newUser)).pipe(
          switchMap(() => from([newUser]))
        );
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => this.isUserApproved(user?.uid).pipe(
        switchMap(approved => {
          if (!approved) {
            throw new Error('Your account has not been approved by an admin.');
          }
          return from([user]);
        })
      ))
    );
  }

  getUserRole(uid: string): Observable<string> {
    return this.db.collection('users').doc(uid).get().pipe(
      switchMap(doc => doc.exists ? doc.data()?.role : 'user')
    );
  }

  isUserApproved(uid: string): Observable<boolean> {
    return this.db.collection('users').doc(uid).get().pipe(
      switchMap(doc => doc.exists ? doc.data()?.approved : false)
    );
  }
}
