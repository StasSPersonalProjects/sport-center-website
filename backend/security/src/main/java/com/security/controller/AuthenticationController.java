package com.security.controller;

import com.security.dto.AuthenticationRequest;
import com.security.dto.AuthenticationResponse;
import com.security.dto.RegisterRequest;
import com.security.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            LOG.debug("Passwords doesn't match {} {}", request.getPassword(), request.getConfirmPassword());
            return ResponseEntity.badRequest().body("Passwords doesn't match.");
        }
        LOG.debug("Registering new user: {}", request.getFirstName());
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws BadCredentialsException {
        LOG.debug("Authenticating a user: {}", request.getEmail());
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh")
    public void refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @PostMapping("/validate")
    public Boolean validateToken(@RequestHeader("Authorization") String token) {
        LOG.debug("Received token for validation: {}", token);
        boolean result = authenticationService.validateToken(token);
        LOG.debug("Validated? {}", result);
        return result;
    }

    @PostMapping("/user/validate")
    public Integer getUserIdByValidToken(@RequestHeader("Authorization") String token) {
        LOG.debug("Received token for validation and extraction of user Id: {}", token);
        return authenticationService.getUserIdByValidToken(token);
    }

}
