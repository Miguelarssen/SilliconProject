package com.backend.prod.model.Pessoa.DTO;

import java.sql.Date;

public record PessoaCadastroDTO(    
    String nome,
    String cpf,
    Date nascimento
) {  
}
