package com.backend.prod.model.pessoa.DTO;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;

public record PessoaAtualizaDTO(
    
    @NotNull
    Long id,
    String nome,
    String cpf,
    Date nascimento
){
    
}
