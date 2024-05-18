package com.customerdata.repository;

import com.customerdata.entities.RelationsCustomersToService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationsRepository extends JpaRepository<RelationsCustomersToService, Long> {

}
