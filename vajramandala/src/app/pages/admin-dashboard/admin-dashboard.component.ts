import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Questionnaire } from '../../models/questionnaire.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  questionnaires$: Observable<Questionnaire[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.questionnaires$ = this.db.collection<Questionnaire>('questionnaires', ref => ref.where('approved', '==', false)).valueChanges();
  }

  approveQuestionnaire(questionnaire: Questionnaire) {
    this.db.collection('questionnaires').doc(questionnaire.userId).update({ approved: true });
    this.db.collection('users').doc(questionnaire.userId).update({ approved: true });
  }
}
