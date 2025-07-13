package com.backend.prod.model.conta;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.DTO.ContaBloqueiaDTO;
import com.backend.prod.model.conta.DTO.ContaCadastroDTO;
import com.backend.prod.model.conta.DTO.LoginDTO;
import com.backend.prod.model.conta.DTO.SaldoDTO;
import com.backend.prod.model.conta.DTO.SaqueDTO;
import com.backend.prod.model.conta.DTO.depositoDTO;
import com.backend.prod.model.pessoa.Pessoa;
import com.backend.prod.model.transacao.Transacao;
import com.backend.prod.repository.TransacaoRepository;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.backend.prod.repository.TransacaoRepository;

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
    
    //implementar atributo para detecção do limiteSaqueDiario
    private BigDecimal saqueDiarioAtual;
    private Integer tipoConta;
    private Date dataCriacao;
    private Boolean ativo;
    
    private String senha;

    public void bloqueia(@Valid ContaBloqueiaDTO dados) {
        this.ativo = false;
    }

    public void depositar(BigDecimal valor) {

        if (!this.ativo) {
            throw new IllegalStateException("Conta bloqueada");
        }
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor de depósito inválido");
        }

        this.saldo = this.saldo.add(valor);
    }

    public void sacar(SaqueDTO dados){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!this.ativo){
            throw new IllegalStateException("Conta Bloquada");
        }

        if (this.saldo.subtract(dados.valor()).compareTo(BigDecimal.ZERO) < 0) {        
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        if (this.saqueDiarioAtual.add(dados.valor()).compareTo(this.limiteSaqueDiario) > 0) {
            throw new IllegalArgumentException("Limite de saque atingido");
        }

        if (dados.valor() == null || dados.valor().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor de saque inválido");
        }

        if(!encoder.matches(dados.senha(), this.senha)){
            throw new IllegalArgumentException("Senha incorreta");
        }

        this.saqueDiarioAtual = this.saqueDiarioAtual.add(dados.valor());
        this.saldo = this.saldo.subtract(dados.valor());
    }

    public void saldo(SaldoDTO dados){
        
    }

    public boolean login(LoginDTO dados){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(!encoder.matches(dados.senha(), this.senha)){
            throw new IllegalArgumentException("Senha incorreta");
        }

        return true;

    }
}

