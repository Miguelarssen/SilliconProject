package com.backend.prod.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.prod.model.pessoa.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>, JpaSpecificationExecutor<Pessoa>{ 
    
    List<Pessoa> findAll();
    Pessoa findByEmail(String email);
} 