package com.customerdata.entities;

import com.customerdata.dto.OfferedServiceDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "offered_services")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferedService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private double price;

    public static OfferedService of(OfferedServiceDto offeredServiceDto) {
        return OfferedService.builder()
                .name(offeredServiceDto.getName())
                .description(offeredServiceDto.getDescription())
                .price(offeredServiceDto.getPrice())
                .build();
    }
}
