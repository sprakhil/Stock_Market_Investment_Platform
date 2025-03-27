package com.example.MongoSpring.service;

import com.example.MongoSpring.model.Budget;
import com.example.MongoSpring.model.Expense;
import com.example.MongoSpring.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    public Budget addBudget(Budget budget) {
        if (budget.getAllocatedAmount() <= 0) {
            throw new IllegalArgumentException("Allocated amount must be greater than zero.");
        }
        return budgetRepository.save(budget);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Budget addExpense(String category, Expense expense) {
        Budget budget = budgetRepository.findByCategory(category);
        if (budget == null) {
            throw new IllegalArgumentException("Budget category not found.");
        }

        double totalExpenses = budget.getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        double remainingAmount = budget.getAllocatedAmount() - totalExpenses;

        if (expense.getAmount() > remainingAmount) {
            throw new IllegalArgumentException("Insufficient budget.");
        }

        budget.getExpenses().add(expense);
        
        return budgetRepository.save(budget);
    }

    public double getRemainingAmount(Budget budget) {
        double totalExpenses = budget.getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        return budget.getAllocatedAmount() - totalExpenses;
    }
}

