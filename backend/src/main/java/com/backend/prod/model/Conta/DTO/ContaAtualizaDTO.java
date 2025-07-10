package com.backend.prod.model.Conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.validation.constraints.NotNull;

public record ContaAtualizaDTO(
    
    @NotNull
    Long id,
    Long pessoaId,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    Integer tipoConta,
    Date dataCriacao,
    Boolean ativo
){
}