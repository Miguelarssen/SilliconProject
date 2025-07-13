package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.transacao.Transacao;
import com.backend.prod.model.transacao.DTO.TransacaoAtualizaDTO;
import com.backend.prod.model.transacao.DTO.TransacaoCadastroDTO;
import com.backend.prod.model.transacao.DTO.TransacaoListagemDTO;
import com.backend.prod.model.transacao.DTO.TransacaoResponseDTO;
import com.backend.prod.repository.TransacaoRepository;
import com.backend.prod.repository.ContaRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/transacoes")
public class ControllerTransacao {
    
    @Autowired
    private TransacaoRepository repository;
    @Autowired
    private ContaRepository contaRepository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<TransacaoListagemDTO>> listar(){ 

        var transacoes = repository.findAll().stream().map(TransacaoListagemDTO::new).toList();
        return ResponseEntity.ok(transacoes);

    }
    
    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<List<TransacaoListagemDTO>> listar(@PathVariable Long id){ 
        
        var optionalConta = contaRepository.findById(id);
        if (optionalConta.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var conta = optionalConta.get();
        var transacoes = repository.findByConta(conta)
                                .stream()
                                .map(TransacaoListagemDTO::new)
                                .toList();
        
        return ResponseEntity.ok(transacoes);
    }


    @PostMapping
    @Transactional  
    public ResponseEntity<TransacaoResponseDTO> cadastrar(@RequestBody @Valid TransacaoCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var transacao = new Transacao(dados); 
        repository.save(transacao);

        var uri = uriBuilder.path("/transacoes/{id}").buildAndExpand(transacao.getId()).toUri();

        return ResponseEntity.created(uri).body(new TransacaoResponseDTO(transacao));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<TransacaoResponseDTO> atualizar(@RequestBody @Valid TransacaoAtualizaDTO dados){
        var transacao = repository.getReferenceById(dados.id());
        transacao.editaTransacao(dados);
        
        return ResponseEntity.ok(new TransacaoResponseDTO(transacao));
    }
}