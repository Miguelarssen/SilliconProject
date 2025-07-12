package com.backend.prod.model.pessoa.DTO;

import java.sql.Date;

import com.backend.prod.model.pessoa.Pessoa;

public record PessoaResponseDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email
) {
    public PessoaResponseDTO(Pessoa pessoa){
        this(
            pessoa.getId(),
            pessoa.getNome(),
            pessoa.getCpf(),
            pessoa.getNascimento(),
            pessoa.getEmail()
        );
    }
}

