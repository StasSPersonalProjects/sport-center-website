package com.customerdata.service;

import com.customerdata.dto.OfferedServiceDto;
import com.customerdata.dto.PurchasedServiceDto;
import com.customerdata.entities.OfferedService;
import com.customerdata.entities.PurchasedServicesByCustomer;
import com.customerdata.entities.RelationsCustomersToService;
import com.customerdata.repository.OfferedServiceRepository;
import com.customerdata.repository.RelationsRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public List<PurchasedServicesByCustomer> getPurchasedServicesByCostumer(Integer userId) {
        List<PurchasedServicesByCustomer> result =
                offeredServiceRepository.findAllOfferedServicesPurchasedByACustomer(userId);
        result.forEach(r -> {
            LOG.debug("result: name - {}, times bought - {}, total quantity - {}", r.getName(), r.getTimesBought(), r.getTotalQuantity());
        });
        return result;
    }

    @Transactional
    public String addOfferedService(OfferedService offeredService) {
        LOG.debug("Adding new offered service: {}", offeredService.getName());
        OfferedService savedOfferedService = offeredServiceRepository.save(offeredService);
        return savedOfferedService.getName();
    }

    @Transactional
    public double purchaseOfferedServiceByCustomer(
            Integer customerId,
            List<PurchasedServiceDto> purchasedServicesList) {
        double totalPrice = 0;
        for (PurchasedServiceDto p: purchasedServicesList) {
            OfferedService offeredService = offeredServiceRepository.findByName(p.getName());
            if (offeredService == null) {
                LOG.debug("Offered service not found.");
                throw new IllegalArgumentException("Offered service not found with name: " + p.getName());
            }
            LOG.debug("Found offered service: {}", offeredService.getName());
            totalPrice += offeredService.getPrice() * p.getQuantity();
            RelationsCustomersToService relationsCustomersToService =
                    RelationsCustomersToService.builder()
                            .customerId(customerId)
                            .offeredService(offeredService)
                            .quantity(p.getQuantity())
                            .price(offeredService.getPrice() * p.getQuantity())
                            .date(LocalDateTime.now())
                            .build();
            LOG.debug("Saving: {}", relationsCustomersToService.toString());
            relationsRepository.save(relationsCustomersToService);
        }
        return totalPrice;
    }
}
