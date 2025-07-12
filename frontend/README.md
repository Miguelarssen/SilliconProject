# Banco Digital - Frontend

Este é o frontend de um sistema bancário digital desenvolvido em React com TypeScript, utilizando uma paleta de cores verde oliva e componentes modernos.

## 🚀 Funcionalidades

### Telas Implementadas

1. **Tela de Login**
   - Autenticação com número da conta e senha
   - Navegação para tela de cadastro
   - Interface responsiva e intuitiva

2. **Tela de Cadastro**
   - Cadastro de pessoa física (nome, CPF, data de nascimento)
   - Criação de conta bancária (tipo de conta, depósito inicial, senha)
   - Validação de formulários
   - Integração com API simulada

3. **Dashboard Principal**
   - Exibição do saldo da conta
   - Informações do titular e número da conta
   - Botões de ações rápidas (Depositar e Sacar)
   - Status da conta
   - Área para histórico de transações

4. **Tela de Depósito**
   - Formulário para depósito de valores
   - Valores rápidos pré-definidos
   - Resumo da operação
   - Confirmação e feedback visual

5. **Tela de Saque**
   - Formulário para saque com validação de saldo
   - Valores rápidos pré-definidos
   - Confirmação com senha
   - Resumo da operação

## 🎨 Design

- **Paleta de Cores**: Verde oliva como cor principal
- **Componentes**: shadcn/ui para interface moderna
- **Responsividade**: Compatível com desktop e mobile
- **Ícones**: Lucide React para ícones consistentes

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS utilitário
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **JavaScript (JSX)** - Linguagem de programação

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Login.jsx          # Tela de login
│   ├── Register.jsx       # Tela de cadastro
│   ├── Dashboard.jsx      # Dashboard principal
│   ├── Deposit.jsx        # Tela de depósito
│   └── Withdraw.jsx       # Tela de saque
├── services/
│   └── api.js            # Serviços de API
├── App.jsx               # Componente principal
├── App.css               # Estilos globais
└── main.jsx              # Ponto de entrada
```

## 🔧 Como Executar

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   pnpm run dev
   ```

3. **Acessar a aplicação:**
   - Abra o navegador em `http://localhost:5173`

## 🔌 Integração com Backend

O projeto inclui um serviço de API (`src/services/api.js`) que pode ser configurado para integrar com o backend Spring Boot fornecido:

### Endpoints Mapeados

- **Pessoas**: `/pessoas` (GET, POST, PUT)
- **Contas**: `/contas` (GET, POST, DELETE)
- **Operações**: `/contas/deposito`, `/contas/saque`, `/contas/saldo`
- **Transações**: `/transacoes` (GET, POST, PUT)

### Configuração

Para conectar com o backend real, edite o arquivo `src/services/api.js`:

```javascript
// Trocar de MockApiService para ApiService
const apiService = new ApiService() // Para backend real
// const apiService = new MockApiService() // Para desenvolvimento
```

E configure a URL base do backend:

```javascript
const API_BASE_URL = 'http://localhost:8080' // URL do seu backend
```

## 📱 Funcionalidades Testadas

✅ Navegação entre telas  
✅ Cadastro de usuário  
✅ Login simulado  
✅ Dashboard com informações da conta  
✅ Operação de depósito  
✅ Operação de saque  
✅ Atualização de saldo em tempo real  
✅ Validações de formulário  
✅ Feedback visual das operações  

## 🎯 Próximos Passos

- Implementar autenticação real
- Adicionar histórico de transações
- Implementar transferências entre contas
- Adicionar notificações push
- Melhorar acessibilidade
- Adicionar testes automatizados

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

