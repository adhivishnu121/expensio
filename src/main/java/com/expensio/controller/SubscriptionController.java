package com.expensio.controller;

import com.expensio.model.Subscription;
import com.expensio.model.User;
import com.expensio.repository.UserRepository;
import com.expensio.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;
@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriptionController {

    private final SubscriptionService service;
    private final UserRepository userRepo;

    public SubscriptionController(SubscriptionService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<Subscription> getSubscriptions(@RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return service.getUserSubscriptions(user);
    }

    @PostMapping
    public Subscription add(@RequestBody Subscription sub, @RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        sub.setUser(user);
        return service.save(sub);
    }

    @PutMapping("/{id}")
    public Subscription update(@PathVariable Long id, @RequestBody Subscription sub) {
        return service.update(id, sub);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

}
