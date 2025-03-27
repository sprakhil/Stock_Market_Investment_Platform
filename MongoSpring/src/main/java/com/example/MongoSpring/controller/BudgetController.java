package com.example.MongoSpring.controller;

import com.example.MongoSpring.model.Budget;
import com.example.MongoSpring.model.Expense;
import com.example.MongoSpring.repository.BudgetRepository; // ✅ Import repository
import com.example.MongoSpring.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend access
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private BudgetRepository budgetRepository; // ✅ Inject BudgetRepository

    // Add a new budget
    @PostMapping("/add")
    public ResponseEntity<?> addBudget(@RequestBody Budget budget) {
        if (budget.getAllocatedAmount() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Allocated amount must be greater than zero.");
        }
        Budget savedBudget = budgetService.addBudget(budget);
        return ResponseEntity.ok(savedBudget);
    }

    // Get all budgets
    @GetMapping("/all")
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    // Add expense to a budget category
    @PostMapping("/addExpense/{category}")
    public ResponseEntity<?> addExpense(@PathVariable String category, @RequestBody Expense expense) {
        Budget budget = budgetRepository.findByCategory(category); // ✅ Now it's correctly injected

        if (budget == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Budget category not found!");
        }

        // ✅ Fix: Use addExpense() method to update remainingAmount correctly
        try {
            budget.addExpense(expense);
            budgetRepository.save(budget);
            return ResponseEntity.ok(budget);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
