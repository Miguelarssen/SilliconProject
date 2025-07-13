package com.backend.prod.model.transacao;
import lombok.Getter;

@Getter
public enum tipoTransacao {
    SAQUE("Saque"),
    DEPOSITO("Depósito");

    private final String descricao;

    tipoTransacao(String descricao) {
        this.descricao = descricao;
    }
}