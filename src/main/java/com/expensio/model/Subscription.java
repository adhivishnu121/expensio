package com.expensio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double amount;
    private String cycle;
    private String nextPayment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Subscription() {}

    public Long getId() { return id; }
   
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCycle() { return cycle; }
    public void setCycle(String cycle) { this.cycle = cycle; }

    public String getNextPayment() { return nextPayment; }
    public void setNextPayment(String nextPayment) { this.nextPayment = nextPayment; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
