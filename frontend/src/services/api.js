// Configuração da API para integração com o backend Spring Boot
const API_BASE_URL = 'http://localhost:8080' // Ajustar conforme necessário

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Método auxiliar para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Algumas respostas podem não ter conteúdo (204 No Content)
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return null
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // ===== PESSOAS =====
  
  // Cadastrar pessoa
  async cadastrarPessoa(dadosPessoa) {
    return this.request('/pessoas', {
      method: 'POST',
      body: JSON.stringify({
        nome: dadosPessoa.name,
        cpf: dadosPessoa.cpf,
        nascimento: dadosPessoa.birthDate
      })
    })
  }

  // Listar pessoas
  async listarPessoas() {
    return this.request('/pessoas')
  }

  // Atualizar pessoa
  async atualizarPessoa(id, dadosPessoa) {
    return this.request('/pessoas', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        nome: dadosPessoa.name,
        cpf: dadosPessoa.cpf,
        nascimento: dadosPessoa.birthDate
      })
    })
  }

  // ===== CONTAS =====
  
  // Cadastrar conta
  async cadastrarConta(dadosConta) {
    return this.request('/contas', {
      method: 'POST',
      body: JSON.stringify({
        pessoaId: dadosConta.pessoaId,
        saldo: dadosConta.initialDeposit || 0,
        limiteSaqueDiario: 1000, // Valor padrão
        tipoConta: parseInt(dadosConta.accountType),
        senha: dadosConta.password,
        dataCriacao: new Date().toISOString().split('T')[0],
        ativo: true
      })
    })
  }

  // Listar contas
  async listarContas() {
    return this.request('/contas')
  }

  // Bloquear/desbloquear conta
  async bloquearConta(id, ativo) {
    return this.request('/contas', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
        ativo: ativo
      })
    })
  }

  // Depositar
  async depositar(contaId, valor) {
    return this.request('/contas/deposito', {
      method: 'POST',
      body: JSON.stringify({
        id: contaId,
        valor: valor
      })
    })
  }

  // Sacar
  async sacar(contaId, valor, senha) {
    return this.request('/contas/saque', {
      method: 'POST',
      body: JSON.stringify({
        id: contaId,
        valor: valor,
        senha: senha
      })
    })
  }

  // Consultar saldo
  async consultarSaldo(contaId) {
    return this.request('/contas/saldo', {
      method: 'GET',
      body: JSON.stringify({
        id: contaId
      })
    })
  }

  // ===== TRANSAÇÕES =====
  
  // Listar transações
  async listarTransacoes() {
    return this.request('/transacoes')
  }

  // Cadastrar transação
  async cadastrarTransacao(dadosTransacao) {
    return this.request('/transacoes', {
      method: 'POST',
      body: JSON.stringify(dadosTransacao)
    })
  }

  // Atualizar transação
  async atualizarTransacao(id, dadosTransacao) {
    return this.request('/transacoes', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        ...dadosTransacao
      })
    })
  }
}

// Simulação de dados para desenvolvimento (quando o backend não estiver disponível)
class MockApiService {
  constructor() {
    this.pessoas = []
    this.contas = []
    this.transacoes = []
    this.nextId = 1
  }

  async cadastrarPessoa(dadosPessoa) {
    const pessoa = {
      id: this.nextId++,
      nome: dadosPessoa.name,
      cpf: dadosPessoa.cpf,
      nascimento: dadosPessoa.birthDate
    }
    this.pessoas.push(pessoa)
    return pessoa
  }

  async cadastrarConta(dadosConta) {
    const conta = {
      id: this.nextId++,
      pessoaId: dadosConta.pessoaId,
      numeroConta: `${Math.floor(Math.random() * 900000) + 100000}`,
      saldo: parseFloat(dadosConta.initialDeposit) || 0,
      limiteSaqueDiario: 1000,
      tipoConta: parseInt(dadosConta.accountType),
      dataCriacao: new Date().toISOString().split('T')[0],
      ativo: true
    }
    this.contas.push(conta)
    return conta
  }

  async depositar(contaId, valor) {
    const conta = this.contas.find(c => c.id === contaId)
    if (conta) {
      conta.saldo += parseFloat(valor)
      return { success: true, novoSaldo: conta.saldo }
    }
    throw new Error('Conta não encontrada')
  }

  async sacar(contaId, valor, senha) {
    const conta = this.contas.find(c => c.id === contaId)
    if (conta) {
      if (conta.saldo >= parseFloat(valor)) {
        conta.saldo -= parseFloat(valor)
        return { success: true, novoSaldo: conta.saldo }
      } else {
        throw new Error('Saldo insuficiente')
      }
    }
    throw new Error('Conta não encontrada')
  }

  async listarContas() {
    return this.contas
  }

  async listarPessoas() {
    return this.pessoas
  }

  async listarTransacoes() {
    return this.transacoes
  }
}

// Exportar a instância do serviço
// Para desenvolvimento, usar MockApiService
// Para produção, usar ApiService
const apiService = new MockApiService() // Trocar por ApiService() quando o backend estiver disponível

export default apiService

