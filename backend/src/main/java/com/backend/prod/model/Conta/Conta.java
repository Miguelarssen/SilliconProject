package com.backend.prod.model.Conta;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Contas")
@Entity(name = "contas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Conta{
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Pessoa pessoa;
    private BigDecimal saldo;
    private BigDecimal limiteSaqueDiario;
    private Integer tipoConta;
    private Date dataCriacao;
    private Boolean ativo;
}