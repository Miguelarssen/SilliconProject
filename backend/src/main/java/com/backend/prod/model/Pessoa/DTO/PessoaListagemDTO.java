package com.backend.prod.model.Pessoa.DTO;

import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;

public record PessoaListagemDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento
) {
    public PessoaListagemDTO(Pessoa pessoa){
        this(
            pessoa.getId(),
            pessoa.getNome(),
            pessoa.getCpf(),
            pessoa.getNascimento()
        );
    }
}

