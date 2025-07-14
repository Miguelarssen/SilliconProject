package com.backend.prod.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
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
import com.backend.prod.model.transacao.Transacao;
import com.backend.prod.model.transacao.tipoTransacao;
import com.backend.prod.model.transacao.DTO.TransacaoResponseDTO;
import com.backend.prod.model.conta.DTO.ContaCadastroDTO;
import com.backend.prod.model.conta.DTO.ContaListagemDTO;
import com.backend.prod.model.conta.DTO.ContaResponseDTO;
import com.backend.prod.model.conta.DTO.LoginDTO;
import com.backend.prod.model.conta.DTO.SaldoDTO;
import com.backend.prod.model.conta.DTO.SaqueDTO;
import com.backend.prod.repository.ContaRepository;
import com.backend.prod.repository.PessoaRepository;
import com.backend.prod.repository.TransacaoRepository;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/contas")
public class ControllerConta {

    @Autowired
    private ContaRepository repository;
    @Autowired
    private PessoaRepository PessoaRepository;
    @Autowired
    private TransacaoRepository TransacaoRepository;


    //endpoints de crud basico

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
        conta.setSaqueDiarioAtual(new BigDecimal("0.00"));
        conta.setSenha(encoder.encode(dados.senha()));
        conta.setSaldo(new BigDecimal("0.00")); 
        conta.setDataCriacao(new Date(System.currentTimeMillis()));
        conta.setAtivo(true);

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
    public ResponseEntity<TransacaoResponseDTO> depositar(@RequestBody @Valid depositoDTO dados, UriComponentsBuilder uriBuilder) {
        var conta = repository.getReferenceById(dados.id());
        conta.depositar(dados.valor());

        Transacao transacao = new Transacao();
        transacao.setConta(conta);
        transacao.setValor(dados.valor()); 
        transacao.setDataTransacao(new Date(System.currentTimeMillis()));
        transacao.setTipoTransacao(tipoTransacao.DEPOSITO);
        TransacaoRepository.save(transacao);

        var uri = uriBuilder.path("/transacoes/{id}").buildAndExpand(conta.getId()).toUri();
        return ResponseEntity.created(uri).body(new TransacaoResponseDTO(transacao));        
    }

    @GetMapping("/saldo")
    @Transactional
    public ResponseEntity<SaldoDTO> retornoSaldo(@RequestBody @Valid SaldoDTO dados) {
        var conta = repository.getReferenceById(dados.id());
        var saldo = conta.getSaldo();
        return ResponseEntity.ok(new SaldoDTO(conta.getId(), saldo));
    }

    @PostMapping("/saque")
    @Transactional
    public ResponseEntity<TransacaoResponseDTO> depositar(@RequestBody @Valid SaqueDTO dados, UriComponentsBuilder uriBuilder) {
        var conta = repository.getReferenceById(dados.id());
        conta.sacar(dados);
        
        Transacao transacao = new Transacao();
        transacao.setConta(conta);
        transacao.setValor(dados.valor()); 
        transacao.setDataTransacao(new Date(System.currentTimeMillis()));
        transacao.setTipoTransacao(tipoTransacao.SAQUE);
        TransacaoRepository.save(transacao);

        var uri = uriBuilder.path("/transacoes/{id}").buildAndExpand(conta.getId()).toUri();
        return ResponseEntity.created(uri).body(new TransacaoResponseDTO(transacao));        
    }
   
    @PostMapping("/extrato")
    @Transactional
    public ResponseEntity<ContaResponseDTO> extrato(@RequestBody @Valid ContaResponseDTO dados) {
        throw new UnsupportedOperationException("Não implementado ainda");
    }

    @PostMapping("/login")
    public ResponseEntity<ContaResponseDTO> getMethodName(@RequestBody @Valid LoginDTO dados, UriComponentsBuilder uriBuilder) {
        var pessoa = PessoaRepository.findByEmail(dados.email());
        var conta = repository.findByPessoa(pessoa);
        var transacoes = TransacaoRepository.findByConta(conta);

        //Verifica se a última transação feita foi ontem, dessa forma sabendo
        //quando zerar novamente o saqueDiarioAtual
        if (!transacoes.isEmpty()) {
            var ultimaTransacao = transacoes.get(transacoes.size() - 1);
            LocalDate dataUltima = ultimaTransacao.getDataTransacao().toLocalDate();
        
            if (dataUltima.equals(LocalDate.now().minusDays(1))) {
                conta.setSaqueDiarioAtual(new BigDecimal("0.00"));
            }
        }

        var uri = uriBuilder.path("/contas/{id}").buildAndExpand(conta.getId()).toUri();
        return ResponseEntity.created(uri).body(new ContaResponseDTO(conta));
}
}
