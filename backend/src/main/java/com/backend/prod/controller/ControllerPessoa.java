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

import com.backend.prod.model.Pessoa.DTO.PessoaListagemDTO;
import com.backend.prod.model.Pessoa.DTO.PessoaResponseDTO;
import com.backend.prod.model.Pessoa.Pessoa;
import com.backend.prod.model.Pessoa.DTO.PessoaAtualizaDTO;
import com.backend.prod.model.Pessoa.DTO.PessoaCadastroDTO;

import com.backend.prod.repository.PessoaRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/pessoas")
public class ControllerPessoa {
    
    @Autowired
    private PessoaRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<PessoaListagemDTO>> listar(){ 

        var pessoas = repository.findAll().stream().map(PessoaListagemDTO::new).toList();
        return ResponseEntity.ok(pessoas);

    }
    
    @PostMapping
    @Transactional  
    public ResponseEntity<PessoaResponseDTO> cadastrar(@RequestBody @Valid PessoaCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var Pessoa = new Pessoa(dados); 
        repository.save(Pessoa);

        var uri = uriBuilder.path("/pessoas/{id}").buildAndExpand(Pessoa.getId()).toUri();

        return ResponseEntity.created(uri).body(new PessoaResponseDTO(Pessoa));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<PessoaResponseDTO> atualizar(@RequestBody @Valid PessoaAtualizaDTO dados){
        var Pessoa = repository.getReferenceById(dados.id());
        Pessoa.editaPessoa(dados);
        
        return ResponseEntity.ok(new PessoaResponseDTO(Pessoa));
    }
}
