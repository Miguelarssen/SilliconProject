package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record depositoDTO(

    @NotNull
    Long id,

    @NotNull
    @Positive
    BigDecimal valor
){
    
}
