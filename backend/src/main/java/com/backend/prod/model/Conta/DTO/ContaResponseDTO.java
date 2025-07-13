package com.backend.prod.model.conta.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.Conta;

public record ContaResponseDTO(
    Long id,
    Long pessoaId,
    String nome,
    BigDecimal saldo,
    BigDecimal limiteSaqueDiario,
    BigDecimal saqueDiarioAtual,
    Integer tipoConta,
    Date dataCriacao,
    Boolean ativo
) {
    public ContaResponseDTO(Conta conta) {
        this(
            conta.getId(),
            conta.getPessoa().getId(),
            conta.getPessoa().getNome(),
            conta.getSaldo(),
            conta.getLimiteSaqueDiario(),
            conta.getSaqueDiarioAtual(),
            conta.getTipoConta(),
            conta.getDataCriacao(),
            conta.getAtivo()
        );
    }
}
