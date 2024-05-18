package com.customerdata.dto;

import com.customerdata.entities.OfferedService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferedServiceDto {

    private String name;
    private String description;
    private double price;

    public static OfferedServiceDto of(OfferedService offeredService) {
        return OfferedServiceDto.builder()
                .name(offeredService.getName())
                .description(offeredService.getDescription())
                .price(offeredService.getPrice())
                .build();
    }
}
