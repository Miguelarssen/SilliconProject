package com.backend.prod.model.transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.transacao.tipoTransacao;

import jakarta.validation.constraints.NotNull;

public record TransacaoAtualizaDTO(
    
    @NotNull
    Long id,
    Long contaId,
    BigDecimal valor,
    tipoTransacao tipoTransacao,
    Date dataTransacao

){
}
