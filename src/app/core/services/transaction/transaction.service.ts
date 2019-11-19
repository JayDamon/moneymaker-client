import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDataService } from './transaction-data.service';
import { Transaction } from 'src/app/shared/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private transactionDataService : TransactionDataService) { }
  
  getTransactions(): Observable<Transaction[]> {

    // return this.http.get<Transaction[]>('http://localhost:8080/oaka/v1/transactions');
    return this.transactionDataService.getTransactions();

  }

}
