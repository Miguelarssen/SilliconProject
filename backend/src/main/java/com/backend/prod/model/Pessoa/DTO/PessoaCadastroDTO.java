package com.backend.prod.model.pessoa.DTO;

import java.sql.Date;

public record PessoaCadastroDTO(    
    String nome,
    String cpf,
    Date nascimento,
    String email
) {  
}
