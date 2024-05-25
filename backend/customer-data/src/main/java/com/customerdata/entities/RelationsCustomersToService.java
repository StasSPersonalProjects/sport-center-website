package com.customerdata.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "relations_customers_to_service")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RelationsCustomersToService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer customerId;

    @ManyToOne
    @JoinColumn(name = "offered_services_id", nullable = false)
    private OfferedService offeredService;
    private Integer quantity;
    private Double price;
    private LocalDateTime date;
}
