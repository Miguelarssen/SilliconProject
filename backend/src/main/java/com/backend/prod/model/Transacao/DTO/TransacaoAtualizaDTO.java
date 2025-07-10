package com.backend.prod.model.Transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.validation.constraints.NotNull;

public record TransacaoAtualizaDTO(
    
    @NotNull
    Long id,
    Long contaId,
    BigDecimal valor,
    Date dataTransacao
){
}
