package com.expensio.service;

import com.expensio.model.Subscription;
import com.expensio.model.User;
import com.expensio.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SubscriptionService {

    private final SubscriptionRepository repo;

    public SubscriptionService(SubscriptionRepository repo) {
        this.repo = repo;
    }

    public List<Subscription> getUserSubscriptions(User user) {
        return repo.findByUser(user);
    }

    public Subscription save(Subscription sub) {
        return repo.save(sub);
    }

    public Subscription update(Long id, Subscription updated) {
        Subscription existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        existing.setName(updated.getName());
        existing.setAmount(updated.getAmount());
        existing.setCycle(updated.getCycle());
        existing.setNextPayment(updated.getNextPayment());

        return repo.save(existing);
    }
}
