package com.backend.prod.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.prod.model.transacao.Transacao;
import com.backend.prod.model.conta.Conta;


public interface TransacaoRepository extends JpaRepository<Transacao, Long>, JpaSpecificationExecutor<Transacao>{ 
    
    List<Transacao> findAll();
    List<Transacao> findByConta(Conta conta);
} 