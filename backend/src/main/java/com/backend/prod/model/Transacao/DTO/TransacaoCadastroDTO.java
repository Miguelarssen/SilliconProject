package com.backend.prod.model.transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.transacao.tipoTransacao;

public record TransacaoCadastroDTO(
    Long contaId,
    BigDecimal valor,
    tipoTransacao tipoTransacao,
    Date dataTransacao
) {
}