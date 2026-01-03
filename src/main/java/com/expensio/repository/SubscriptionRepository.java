package com.expensio.repository;

import com.expensio.model.Subscription;
import com.expensio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser(User user);
}
