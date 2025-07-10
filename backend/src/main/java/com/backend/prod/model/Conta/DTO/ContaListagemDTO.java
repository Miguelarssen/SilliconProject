package com.backend.prod.model.Conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.Conta.Conta;

public record ContaListagemDTO(
    Long id,
    Long pessoaId,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    Integer tipoConta,
    Date dataCriacao,
    Boolean ativo
) {
    public ContaListagemDTO(Conta conta){
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