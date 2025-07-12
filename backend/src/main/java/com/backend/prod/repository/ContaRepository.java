package com.backend.prod.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.prod.model.conta.Conta;
import com.backend.prod.model.pessoa.Pessoa;


public interface ContaRepository extends JpaRepository<Conta, Long>, JpaSpecificationExecutor<Conta>{ 
    
    List<Conta> findAll();
    Conta findByPessoa(Pessoa pessoa);
} 