package com.customerdata.repository;

import com.customerdata.entities.OfferedService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OfferedServiceRepository extends JpaRepository<OfferedService, Integer> {

    @Query(value = "SELECT o.name FROM offered_services o " +
            "JOIN relations_customers_to_service r ON o.id = r.offered_services_id " +
            "WHERE r.customer_id = :customerId", nativeQuery = true)
    List<String> findAllOfferedServicesPurchasedByACustomer(@Param("customerId") Integer customerId);

    @Query(value = "SELECT * FROM offered_services o WHERE o.name = :name", nativeQuery = true)
    OfferedService findByName(@Param("name") String name);

}
