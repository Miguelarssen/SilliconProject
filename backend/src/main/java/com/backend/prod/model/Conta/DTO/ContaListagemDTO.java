package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.Conta;

public record ContaListagemDTO(
    Long id,
    Long pessoaId,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    BigDecimal saqueDiarioAtual,
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
            conta.getSaqueDiarioAtual(),
            conta.getTipoConta(),
            conta.getDataCriacao(),
            conta.getAtivo()
        );
    }
}