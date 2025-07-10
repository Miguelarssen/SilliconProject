package com.backend.prod.model.transacao.DTO;

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
