package com.backend.prod.model.Conta;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;
import com.backend.prod.model.Conta.DTO.ContaAtualizaDTO;
import com.backend.prod.model.Conta.DTO.ContaCadastroDTO;

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

@Table(name = "Contas")
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
    
    //@ManyToOne
    //@JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;
    private BigDecimal saldo;
    private BigDecimal limiteSaqueDiario;
    private Integer tipoConta;
    private Date dataCriacao;
    private Boolean ativo;

    public void editaConta(@Valid ContaAtualizaDTO dados) {
        if (dados.saldo() != null) {
            this.saldo = dados.saldo();
        }
        if (dados.limiteSaqueDiario() != null) {
            this.limiteSaqueDiario = dados.limiteSaqueDiario();
        }
        if (dados.tipoConta() != null) {
            this.tipoConta = dados.tipoConta();
        }
        if (dados.dataCriacao() != null) {
            this.dataCriacao = dados.dataCriacao();
        }
        if (dados.ativo() != null) {
            this.ativo = dados.ativo();
        }
    }
}

