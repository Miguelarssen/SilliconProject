package com.backend.prod.model.Pessoa.DTO;

import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;

public record PessoaResponseDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento
) {
    public PessoaResponseDTO(Pessoa pessoa){
        this(
            pessoa.getId(),
            pessoa.getNome(),
            pessoa.getCpf(),
            pessoa.getNascimento()
        );
    }
}

