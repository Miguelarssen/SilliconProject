package com.backend.prod.model.Transacao.DTO;

import java.math.BigDecimal;
import java.sql.Date;

public record TransacaoCadastroDTO(
    Long contaId,
    BigDecimal valor,
    Date dataTransacao
) {
}