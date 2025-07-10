package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

public record ContaCadastroDTO(
    Long pessoaId,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    Integer tipoConta,
    Date dataCriacao,
    Boolean ativo
) {
}