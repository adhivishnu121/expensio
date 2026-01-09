package com.expensio.service;

import com.expensio.model.Expense;
import com.expensio.model.User;
import com.expensio.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public List<Expense> getUserExpenses(User user) {
        return repo.findByUser(user);
    }

    public Expense save(Expense expense) {
        return repo.save(expense);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Expense update(Long id, Expense updated) {
        Expense existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        existing.setDescription(updated.getDescription());
        existing.setAmount(updated.getAmount());
        existing.setCategory(updated.getCategory());
        existing.setDate(updated.getDate());

        return repo.save(existing);
    }
}
