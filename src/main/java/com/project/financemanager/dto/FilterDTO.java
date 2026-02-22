package com.project.financemanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FilterDTO {

    // Enum of ["income", "expense"]
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private String keyword;
    private String sortField; // date, amount, name
    private String sortOrder; // asc or desc
}
