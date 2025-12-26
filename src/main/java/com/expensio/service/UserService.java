package com.expensio.service;

import com.expensio.dto.UserDTO;
import com.expensio.model.User;
import com.expensio.repository.UserRepository;
import com.expensio.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(UserDTO userDTO) throws Exception {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }

        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // hash password

        return userRepository.save(user);
    }

    @Autowired
    private JwtUtil jwtUtil;

    public User loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid credentials");
        }

        return user;
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }
}