package com.backend.prod.model.conta;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.DTO.ContaBloqueiaDTO;
import com.backend.prod.model.conta.DTO.ContaCadastroDTO;
import com.backend.prod.model.pessoa.Pessoa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "conta")
@Entity(name = "contas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Conta{
    
    public Conta(ContaCadastroDTO dados) {
        this.saldo = dados.saldo();
        this.limiteSaqueDiario = dados.limiteSaqueDiario();
        this.tipoConta = dados.tipoConta();
        this.dataCriacao = dados.dataCriacao();
        this.ativo = dados.ativo();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;
    private BigDecimal saldo;
    private BigDecimal limiteSaqueDiario;
    private Integer tipoConta;
    private Date dataCriacao;
    private Boolean ativo;

    private String senha;

    public void bloqueia(@Valid ContaBloqueiaDTO dados) {
        this.ativo = false;
    }
}

