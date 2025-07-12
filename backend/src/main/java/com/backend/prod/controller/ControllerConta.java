package com.backend.prod.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.conta.Conta;
import com.backend.prod.model.conta.DTO.ContaBloqueiaDTO;
import com.backend.prod.model.conta.DTO.depositoDTO;
import com.backend.prod.model.pessoa.Pessoa;
import com.backend.prod.model.conta.DTO.ContaCadastroDTO;
import com.backend.prod.model.conta.DTO.ContaListagemDTO;
import com.backend.prod.model.conta.DTO.ContaResponseDTO;
import com.backend.prod.model.conta.DTO.LoginDTO;
import com.backend.prod.model.conta.DTO.SaldoDTO;
import com.backend.prod.model.conta.DTO.SaqueDTO;
import com.backend.prod.repository.ContaRepository;
import com.backend.prod.repository.PessoaRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/contas")
public class ControllerConta {

    @Autowired
    private ContaRepository repository;
    @Autowired
    private PessoaRepository PessoaRepository;

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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Pessoa pessoa = PessoaRepository.getReferenceById(dados.pessoaId());
        conta.setPessoa(pessoa);
        conta.setSenha(encoder.encode(dados.senha()));

        repository.save(conta);

        var uri = uriBuilder.path("/contas/{id}").buildAndExpand(conta.getId()).toUri();
        return ResponseEntity.created(uri).body(new ContaResponseDTO(conta));        
    }

    
    @DeleteMapping
    @Transactional
    public ResponseEntity<ContaResponseDTO> atualizar(@RequestBody @Valid ContaBloqueiaDTO dados){
        var conta = repository.getReferenceById(dados.id());
        conta.bloqueia(dados);
        
        return ResponseEntity.ok(new ContaResponseDTO(conta));
    }

    
    //Endpoint's de regra de negócio

    @PostMapping("/deposito")
    @Transactional
    public ResponseEntity<Void> depositar(@RequestBody @Valid depositoDTO dados) {
        var conta = repository.getReferenceById(dados.id());
        conta.depositar(dados.valor());

        return ResponseEntity.ok().build();
    }


    @GetMapping("/saldo")
    @Transactional
    public ResponseEntity<ContaResponseDTO> retornoSaldo(@RequestBody @Valid SaldoDTO dados){
        var conta = repository.getReferenceById(dados.id());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/saque")
    @Transactional
    public ResponseEntity<ContaResponseDTO> saque(@RequestBody @Valid SaqueDTO dados) {
        var conta = repository.getReferenceById(dados.id());
        conta.sacar(dados);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/extrato")
    @Transactional
    public ResponseEntity<ContaResponseDTO> extrato(@RequestBody @Valid ContaResponseDTO dados) {
        throw new UnsupportedOperationException("Não implementado ainda");
    }

    @PostMapping("/login")
    public boolean getMethodName(@RequestBody @Valid LoginDTO dados) {
        var pessoa = PessoaRepository.findByEmail(dados.email());
        var conta = repository.findByPessoa(pessoa);

        return conta.login(dados);
    }
    
}
