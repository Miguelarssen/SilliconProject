package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Conta.DTO.ContaAtualizaDTO;
import com.backend.prod.model.Conta.DTO.ContaCadastroDTO;
import com.backend.prod.model.Conta.DTO.ContaListagemDTO;
import com.backend.prod.model.Conta.DTO.ContaResponseDTO;
import com.backend.prod.model.Conta.Conta;
import com.backend.prod.repository.ContaRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/contas")
public class ControllerConta {
    
    @Autowired
    private ContaRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<ContaListagemDTO>> listar(){ 

        var contas = repository.findAll().stream().map(ContaListagemDTO::new).toList();
        return ResponseEntity.ok(contas);

    }
    
    @PostMapping
    @Transactional  
    public ResponseEntity<ContaResponseDTO> cadastrar(@RequestBody @Valid ContaCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var conta = new Conta(dados); 
        repository.save(conta);

        var uri = uriBuilder.path("/contas/{id}").buildAndExpand(conta.getId()).toUri();

        return ResponseEntity.created(uri).body(new ContaResponseDTO(conta));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<ContaResponseDTO> atualizar(@RequestBody @Valid ContaAtualizaDTO dados){
        var conta = repository.getReferenceById(dados.id());
        conta.editaConta(dados);
        
        return ResponseEntity.ok(new ContaResponseDTO(conta));
    }
}