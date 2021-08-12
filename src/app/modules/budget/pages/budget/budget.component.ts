import { TransactionService } from './../../../../core/services/transaction/transaction.service';
import { Subscription } from 'rxjs';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Budget } from 'src/app/shared/models/Budget';
import { Transaction } from 'src/app/shared/models/Transaction';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  showSpinner = true;
  showTransactionSpiner = true;
  showBudgetSummarySpinner = true;

  firstMonthBudget = new Date();

  firstMonthBudgetSummary: BudgetSummary[];
  secondMonthBudgetSummary: BudgetSummary[];
  budgets: Array<Budget>;
  budgetsExist: boolean;
  transactions: Array<Transaction>;

  constructor(private budgetService: BudgetService, private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getBudgets();
    this.updateBudgetSummaries();
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getBudgets() {
    this.subscriptions.add(this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
      this.budgetsExist = budgets.length > 0;
      this.showSpinner = false;
    }));
  }

  private getTransactions(): void {
    this.subscriptions.add(this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.showTransactionSpiner = false;
    }));
  }

  private updateBudgetSummaries() {

    let secondMonthBudget = new Date(
      this.firstMonthBudget.getFullYear(),
      this.firstMonthBudget.getMonth() + 1,
      1
    );

    this.subscriptions.add(
      this.budgetService.getBudgetSummary(
          this.firstMonthBudget.getFullYear(),
          this.firstMonthBudget.getMonth()
        ).subscribe(
        (budgetSummaries: Array<BudgetSummary>) => {
          this.firstMonthBudgetSummary = budgetSummaries;
          this.showBudgetSummarySpinner = false;
        })
    );

    this.subscriptions.add(
      this.budgetService.getBudgetSummary(
          secondMonthBudget.getFullYear(),
          secondMonthBudget.getMonth()
        ).subscribe((budgetSummaries: Array<BudgetSummary>) => {
        this.secondMonthBudgetSummary = budgetSummaries;
      })
    );

  }

}
