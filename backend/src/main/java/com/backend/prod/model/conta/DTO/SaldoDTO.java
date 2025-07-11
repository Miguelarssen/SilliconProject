package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record SaldoDTO(
    @NotNull
    Long id,
    BigDecimal saldo
){
    
}
