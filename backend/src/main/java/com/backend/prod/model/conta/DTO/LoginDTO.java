package com.backend.prod.model.conta.DTO;

import jakarta.validation.constraints.NotNull;

public record LoginDTO(
    @NotNull
    String email,

    @NotNull
    String senha,
    String nome,
    String saldo
) {  
}
