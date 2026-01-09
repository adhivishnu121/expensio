package com.expensio.controller;

import com.expensio.model.Expense;
import com.expensio.model.User;
import com.expensio.repository.UserRepository;
import com.expensio.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService service;
    private final UserRepository userRepo;

    public ExpenseController(ExpenseService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<Expense> getExpenses(@RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return service.getUserExpenses(user);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, @RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        expense.setUser(user);
        return service.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return service.update(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.deleteById(id);
    }
}
