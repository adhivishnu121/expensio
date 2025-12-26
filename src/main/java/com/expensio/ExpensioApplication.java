package com.expensio;
import com.expensio.model.User;
import com.expensio.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ExpensioApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpensioApplication.class, args);
    }

    
    
}
