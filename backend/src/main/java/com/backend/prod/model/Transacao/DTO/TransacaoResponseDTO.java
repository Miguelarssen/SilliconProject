package com.backend.prod.model.Transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.Transacao.Transacao;

public record TransacaoResponseDTO(
    Long id,
    Long contaId,
    BigDecimal valor,
    Date dataTransacao
) {
    public TransacaoResponseDTO(Transacao transacao){
        this(
            transacao.getId(),
            transacao.getConta().getId(),
            transacao.getValor(),
            transacao.getDataTransacao()
        );
    }
}
