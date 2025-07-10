package com.backend.prod.model.transacao;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.conta.Conta;
import com.backend.prod.model.transacao.DTO.TransacaoAtualizaDTO;
import com.backend.prod.model.transacao.DTO.TransacaoCadastroDTO;

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

@Table(name = "transacao")
@Entity(name = "transacoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Transacao {

    public Transacao(TransacaoCadastroDTO dados) {
        this.valor = dados.valor();
        this.dataTransacao = dados.dataTransacao();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "conta_id")
    private Conta conta;
    private BigDecimal valor;
    private Date dataTransacao;

    public void editaTransacao(@Valid TransacaoAtualizaDTO dados) {
        if (dados.valor() != null) {
            this.valor = dados.valor();
        }
        if (dados.dataTransacao() != null) {
            this.dataTransacao = dados.dataTransacao();
        }
    }
}