package com.backend.prod.model.Transacao;

import java.math.BigDecimal;
import java.sql.Date;

import com.backend.prod.model.Conta.Conta;
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


@Table(name = "Transacoes")
@Entity(name = "transacoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Transacao {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Conta conta;
    private BigDecimal valor;
    private Date dataTransacao;
}
