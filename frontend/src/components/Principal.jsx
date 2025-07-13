import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Eye, 
  EyeOff, 
  LogOut, 
  User,
  CreditCard,
  DollarSign
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTransacao } from '@/hooks/useTransacao'
import Transacao from './Transacao'

export default function Principal({ user, onLogout }) {
  const navigate = useNavigate();
  const { transacoes } = useTransacao(user?.id);
  const [showBalance, setShowBalance] = useState(true);

  function onNavigateToDeposito() {
    navigate('/deposito', { state: { user } });
  }

  function onNavigateToSaque() {
    navigate('/saque', { state: { user } });
  }

  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'R$ 0,00'
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getAccountTypeLabel = (type) => {
    const types = {
      1: 'Conta Corrente',
    }
    return types[type] || 'Conta Corrente'
  }

  const getTitularName = () => {
    if (!user) return 'Carregando...'
    return user.nome
  }

  const getSaldo = () => {
    if (!user) return 0
    return user.saldo || 0
  }

  const getAccountId = () => {
    if (!user) return 'Carregando...'
    return user.id
  }

  const getAccountType = () => {
    if (!user) return 1
    return user.tipoConta
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando dados da conta...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Banco Digital</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{getTitularName()}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Saldo da Conta</CardTitle>
                  <CardDescription>
                    Conta: {getAccountId()} • {getAccountTypeLabel(getAccountType())}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {showBalance ? formatCurrency(getSaldo()) : '••••••'}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Saldo disponível para movimentação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Minha Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Titular</p>
                <p className="font-medium">{getTitularName()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Número da Conta</p>
                <p className="font-medium">{getAccountId()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Conta</p>
                <p className="font-medium">{getAccountTypeLabel(getAccountType())}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Ativa
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>
                Realize suas operações bancárias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  size="lg"
                  className="h-20 flex-col space-y-2"
                  onClick={onNavigateToDeposito}
                >
                  <ArrowDownCircle className="h-8 w-8" />
                  <span>Depositar</span>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  onClick={onNavigateToSaque}
                >
                  <ArrowUpCircle className="h-8 w-8" />
                  <span>Sacar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Últimas Atividades</CardTitle>
              <CardDescription>
                Suas transações mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto">
              <div className="space-y-4">
                {transacoes.map((transacao) => (
                  <Transacao key={transacao.id} transacao={transacao} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
