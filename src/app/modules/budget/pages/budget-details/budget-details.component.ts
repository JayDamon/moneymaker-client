import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Component } from '@angular/core';
import { Budget } from 'src/app/shared/models/Budget';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { FrequencyService } from 'src/app/core/services/frequency/frequency.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBudgetComponent } from '../../components/new-budget/new-budget.component';
import { TransactionBudgetCategory } from 'src/app/shared/models/TransactionBudgetCategory';
import { NoResourcesDialogComponent } from 'src/app/shared/components/no-resources-dialog/no-resources-dialog.component';


export interface NewBudgetDialogData {
  budgetCategories: Array<BudgetCategory>;
  frequencyTypes: Array<FrequencyType>;
  newBudget: Budget
}

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent {

  budgets: Array<Budget>;
  budgetsCreated: Boolean;
  dataLoading: Boolean = true;
  budgetCategories: Array<BudgetCategory>;
  frequencyTypes: Array<FrequencyType>;

  constructor(private budgetService: BudgetService, private frequencyService: FrequencyService, private dialog: MatDialog) {
    this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
      this.budgets = budgets;

      this.dataLoading = false;
      this.budgetsCreated = budgets.length > 0;
      if (!this.budgetsCreated) this.showBudgetUpdateDialog();
    });

    this.budgetService.getBudgetCategories().subscribe((budgetCategories: Array<BudgetCategory>) => {
      this.budgetCategories = budgetCategories;
    });

    this.frequencyService.getFrequencyTypes().subscribe((frequencyTypes: Array<FrequencyType>) => {
      this.frequencyTypes = frequencyTypes;
    });
  }

  private showBudgetUpdateDialog() {
    const dialogRef = this.dialog.open(NoResourcesDialogComponent, {
      data: {
        displayText: "You have not added any budgets yet, would you like to create some now?",
        route: "new-budgets"
      }
    });
  }

  updateBudget(budget: Budget) {
    this.budgetService.updateBudget(budget);
  }

  createBudget() {

    let emptyCategory: TransactionBudgetCategory = {
      id: null,
      nameId: null,
      name: null,
      typeId: null,
      type: null
    }

    let emptyBudget: Budget = {
      id: null,
      name: '',
      startDate: null,
      endDate: null,
      frequencyTypeId: null,
      frequencyType: null,
      amount: null,
      inUse: true,
      budgetCategory: emptyCategory
    }

    const dialogRef = this.dialog.open(NewBudgetComponent, {
      data: {
        frequencyTypes: this.frequencyTypes,
        budgetCategories: this.budgetCategories,
        newBudget: emptyBudget
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.budgetService.addBudget(result);
        this.budgetService.saveNewBudgets();
        this.budgets.push(result);
        this.updateBudgetArray();
      }
    });
  }

  private updateBudgetArray() {
    let budgets = [];
    this.budgets.forEach(budget => budgets.push(budget));
    this.budgets = budgets;
  }

}
