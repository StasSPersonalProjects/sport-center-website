package com.customerdata.service;

import com.customerdata.dto.OfferedServiceDto;
import com.customerdata.entities.OfferedService;
import com.customerdata.entities.RelationsCustomersToService;
import com.customerdata.repository.OfferedServiceRepository;
import com.customerdata.repository.RelationsRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDataService {

    @Autowired
    private OfferedServiceRepository offeredServiceRepository;

    @Autowired
    private RelationsRepository relationsRepository;

    private static final Logger LOG = LoggerFactory.getLogger(CustomerDataService.class);

    public List<OfferedServiceDto> getAllOfferedServices() {
        List<OfferedService> offeredServices = offeredServiceRepository.findAll();
        return offeredServices.stream().map(OfferedServiceDto::of).toList();
    }

    public List<String> getPurchasedServicesByCostumer(Integer userId) {
        return offeredServiceRepository.findAllOfferedServicesPurchasedByACustomer(userId);
    }

    @Transactional
    public String addOfferedService(OfferedService offeredService) {
        LOG.debug("Adding new offered service: {}", offeredService.getName());
        OfferedService savedOfferedService = offeredServiceRepository.save(offeredService);
        return savedOfferedService.getName();
    }

    @Transactional
    public void purchaseOfferedServiceByCustomer(Integer customerId, String purchase) {
        OfferedService offeredService = offeredServiceRepository.findByName(purchase);
        if (offeredService == null) {
            LOG.debug("Offered service not found.");
            throw new IllegalArgumentException("Offered service not found with name: " + purchase);
        }
        LOG.debug("Found offered service: {}", offeredService.getName());
        RelationsCustomersToService relationsCustomersToService =
                RelationsCustomersToService.builder()
                        .customerId(customerId)
                        .offeredService(offeredService)
                        .build();
        relationsRepository.save(relationsCustomersToService);
    }
}
