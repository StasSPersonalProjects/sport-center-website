package com.customerdata.repository;

import com.customerdata.entities.OfferedService;
import com.customerdata.entities.PurchasedServicesByCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OfferedServiceRepository extends JpaRepository<OfferedService, Integer> {

    @Query(value = "SELECT " +
            "o.name AS name, COUNT(r.id) AS timesBought, SUM(r.quantity) AS totalQuantity " +
            "FROM offered_services o " +
            "JOIN relations_customers_to_service r ON o.id = r.offered_services_id " +
            "WHERE r.customer_id = :customerId " +
            "GROUP BY o.id, o.name", nativeQuery = true)
    List<PurchasedServicesByCustomer> findAllOfferedServicesPurchasedByACustomer(@Param("customerId") Integer customerId);



    @Query(value = "SELECT * FROM offered_services o WHERE o.name = :name", nativeQuery = true)
    OfferedService findByName(@Param("name") String name);

}

//@Query(value = "SELECT \n" +
//        "o.name, COUNT(r.id) AS times_bought, SUM(r.quantity) AS total_quantity\n" +
//        "FROM offered_services o\n" +
//        "JOIN relations_customers_to_service r ON o.id = r.offered_services_id\n" +
//        "WHERE r.customer_id = :customerId \n" +
//        "GROUP BY o.id, o.name", nativeQuery = true)