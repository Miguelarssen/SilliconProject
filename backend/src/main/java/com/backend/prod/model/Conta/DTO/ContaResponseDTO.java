package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.Conta;

public record ContaResponseDTO(
    Long id,
    Long pessoaId,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    Integer tipoConta,
    Date dataCriacao,
    Boolean ativo
) {
    public ContaResponseDTO(Conta conta){
        this(
            conta.getId(),
            conta.getPessoa().getId(),
            conta.getSaldo(),
            conta.getLimiteSaqueDiario(),
            conta.getTipoConta(),
            conta.getDataCriacao(),
            conta.getAtivo()
        );
    }
}