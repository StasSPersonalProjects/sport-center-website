package com.customerdata.controller;

import com.customerdata.dto.OfferedServiceDto;
import com.customerdata.entities.OfferedService;
import com.customerdata.service.CustomerDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerDataController {

    @Value("${application.token-validation.url}")
    private String tokenValidationUrl;

    @Value("${application.user-id.token-validation.url}")
    private String userIdExtractionAndTokenValidationUrl;

    @Autowired
    private CustomerDataService customerDataService;

    private static final Logger LOG = LoggerFactory.getLogger(CustomerDataController.class);

    private boolean validateToken(String token) {
        RestTemplate restTemplate = new RestTemplate();
        LOG.debug("Validating token: {}", token);
        ResponseEntity<Boolean> response = restTemplate.postForEntity(tokenValidationUrl, token, Boolean.class);
        LOG.debug("Validated? {}", response.getBody());
        return response.getBody() != null && response.getBody();
    }

    private Integer validateTokenAndGetCustomerId(String token) {
        RestTemplate restTemplate = new RestTemplate();
        LOG.debug("Sending a request to validate token and extract user ID.");
        ResponseEntity<Integer> response = restTemplate.postForEntity(userIdExtractionAndTokenValidationUrl, token, Integer.class);
        LOG.debug("Received response: {}", response.getBody());
        return response.hasBody() ? response.getBody() : null;
    }

    @GetMapping("/offered-services")
    public ResponseEntity<?> getAllOfferedServices(@RequestHeader("Authorization") String token) {
        LOG.debug("Received request for fetching all available services for a customer.");
        if (!validateToken(token)) {
            LOG.debug("Token not valid.");
            return ResponseEntity.status(401).body("Unauthorized");
        }
        List<OfferedServiceDto> result = customerDataService.getAllOfferedServices();
        return !result.isEmpty() ? ResponseEntity.ok().body(result) : ResponseEntity.noContent().build();
    }

    @PostMapping("/purchase")
    public ResponseEntity<String> purchaseOfferedService(
            @RequestHeader("Authorization") String token,
            @RequestParam String purchase) {
        LOG.debug("Received request for purchasing offered service: {}.", purchase);
        Integer customerId = validateTokenAndGetCustomerId(token);
        LOG.debug("Found user ID: {}", customerId);
        try {
            customerDataService.purchaseOfferedServiceByCustomer(customerId, purchase);
            return ResponseEntity.ok("Service purchased successfully.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/customer/purchased")
    public ResponseEntity<?> getPurchasedServicesByCostumer(@RequestHeader("Authorization") String token) {
        LOG.debug("Received request for fetching all services that a customer purchased.");
        Integer customerId = validateTokenAndGetCustomerId(token);
        if (customerId == null) {
            return ResponseEntity.noContent().build();
        }
        LOG.debug("Customer's Id: {}.", customerId);
        return ResponseEntity.ok().body(customerDataService.getPurchasedServicesByCostumer(customerId));
    }

    @PostMapping("/offered-services")
    public ResponseEntity<String> addOfferedService(
            @RequestBody OfferedServiceDto offeredServiceDto,
            @RequestHeader("Authorization") String token
    ) {
        LOG.debug("Received request for adding new service for customers: {}", offeredServiceDto.getName());
        if (!validateToken(token)) {
            LOG.debug("Token not valid.");
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String name = customerDataService.addOfferedService(OfferedService.of(offeredServiceDto));
        String response = String.format("New service %s added successfully!", name);
        return ResponseEntity.ok().body(response);
    }

}
