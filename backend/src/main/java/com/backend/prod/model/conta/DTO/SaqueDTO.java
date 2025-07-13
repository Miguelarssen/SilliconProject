package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SaqueDTO(

    @NotNull
    Long id,
    String senha,
    @NotNull
    @Positive
    BigDecimal valor
){

}
