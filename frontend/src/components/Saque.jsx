import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowUpCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { CreateSaque } from '@/hooks/CreateSaque'
import { useNavigate } from 'react-router-dom';

export default function Saque({ user, onUpdateBalance }) {
  const [quantia, setQuantia] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const { sacar } = CreateSaque()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const saqueQuantia = parseFloat(quantia)

    console.log('senhasss', {
      senha: senha,
      senhaUser: user.senha
    })

    if (!saqueQuantia || saqueQuantia <= 0) {
      setError('Por favor, insira um valor válido para o saque.')
      return
    }

    if (saqueQuantia > user.saldo) {
      setError('Saldo insuficiente para realizar esta operação.')
      return
    }

    
    if (saqueQuantia > user.limiteSaqueDiario - user.saqueDiarioAtual) {
      setError('Limite de Saque atingido')
      return
    }

    const response = await sacar({ id: user.id, valor: saqueQuantia, senha: senha})
    if (response) {

      setSuccess(true)

    if (onUpdateBalance) {
      onUpdateBalance(user.saldo - saqueQuantia)
    }
      setTimeout(() => {
        navigate('/principal')
      }, 1000)
      
    } else {
      setError('Senha incorreta, tente novamente.')
    }

    setIsLoading(true)
  }

  const quickQuantias = [50, 100, 200, 500]

  const handleQuickQuantia = (value) => {
    setQuantia(value.toString())
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Saque Realizado!</h2>
              <p className="text-muted-foreground">
                Saque de {formatCurrency(parseFloat(quantia))} realizado com sucesso.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecionando para o painel principal...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => navigate('/principal')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl font-bold text-primary flex items-center">
                <ArrowUpCircle className="h-5 w-5 mr-2" />
                Saque
              </CardTitle>
              <CardDescription>
                Retire dinheiro da sua conta
              </CardDescription>
            </div>
          </div>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Limite diário:</span>
              <span className="font-medium">{formatCurrency(user.limiteSaqueDiario)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Sacado hoje:</span>
              <span className="font-medium">{formatCurrency(user.saqueDiarioAtual)}</span>
            </div>
          </div>

        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Saldo disponível</p>
                <p className="text-lg font-semibold">{formatCurrency(user.saldo)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Conta</p>
                <p className="text-sm font-medium">{user.id}</p>
              </div>
            </div>
          </div>

          
          {error && ( 
            <Alert className="mb-4" variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantia">Valor do Saque</Label>
              <Input
                id="quantia"
                name="quantia"
                type="number"
                step="0.01"
                min="0.01"
                max={user.balance}
                placeholder="R$ 0,00"
                value={quantia}
                onChange={(e) => setQuantia(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Valores Rápidos</Label>
              <div className="grid grid-cols-2 gap-2">
                {quickQuantias.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuantia(value)}
                    disabled={value > user.balance}
                  >
                    {formatCurrency(value)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha para Confirmação</Label>
              <Input
                id="senha"
                name="senha"
                type="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {quantia && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Resumo da operação:</strong>
                </p>
                <p className="text-sm text-blue-700">
                  Valor do saque: {formatCurrency(parseFloat(quantia) || 0)}
                </p>
                <p className="text-sm text-blue-700">
                  Saldo após saque: {formatCurrency(user.saldo - (parseFloat(quantia) || 0))}
                </p>

              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!quantia || !senha}
              onClick={handleSubmit}

            >
              {(
                <>
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Confirmar Saque
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => navigate('/principal')}
            >
              Cancelar operação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

