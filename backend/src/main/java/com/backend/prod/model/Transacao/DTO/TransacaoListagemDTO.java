package com.backend.prod.model.transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.transacao.Transacao;
import com.backend.prod.model.transacao.tipoTransacao;

public record TransacaoListagemDTO(
    Long id,
    Long contaId,
    BigDecimal valor,
    tipoTransacao tipoTransacao,
    Date dataTransacao
) {
    public TransacaoListagemDTO(Transacao transacao){
        this(
            transacao.getId(),
            transacao.getConta().getId(),
            transacao.getValor(),
            transacao.getTipoTransacao(),
            transacao.getDataTransacao()
        );
    }
}