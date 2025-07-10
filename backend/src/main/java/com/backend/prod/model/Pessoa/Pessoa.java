package com.backend.prod.model.pessoa;

import java.sql.Date;

import com.backend.prod.model.pessoa.DTO.PessoaAtualizaDTO;
import com.backend.prod.model.pessoa.DTO.PessoaCadastroDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "pessoa")
@Entity(name = "Pessoas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pessoa {

    public Pessoa(PessoaCadastroDTO dados) {
        this.nome = dados.nome();
        this.cpf = dados.cpf();
        this.nascimento = dados.nascimento();
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private Date nascimento;

    public void editaPessoa(@Valid PessoaAtualizaDTO dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.cpf() != null) {
            this.cpf = dados.cpf();
        }
        if (dados.nascimento() != null) {
            this.nascimento = dados.nascimento();
        }
    }

}
