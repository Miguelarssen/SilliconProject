import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowDownCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { CreateDeposito } from '@/hooks/CreateDeposito'
import { useNavigate } from 'react-router-dom';

export default function Deposito({ user, onDeposito, onUpdateBalance }) {
  const [saldo, setSaldo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const { depositar } = CreateDeposito()

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

  const depositoSaldo = parseFloat(saldo)

  if (!depositoSaldo || depositoSaldo <= 0) {
    setError('Por favor, insira um valor válido para o depósito.')
    return
  }

  if (depositoSaldo > 10000) {
    setError('O valor máximo para depósito é R$ 10.000,00.')
    return
  }

  setIsLoading(true)

  const response = await depositar({ id: user.id, valor: depositoSaldo })

  if (response) {
    setSuccess(true)

    if (onUpdateBalance) {
      onUpdateBalance(user.saldo + depositoSaldo)
    }

    if (onDeposito) {
      onDeposito(response)
    }

    setTimeout(() => {
      navigate('/principal')
    }, 1000)
  } else {
    setError('Não foi possível realizar o depósito. Tente novamente.')
  }

  setIsLoading(false)

}
  const quickSaldos = [50, 100, 200, 500, 1000]

  const handleQuickSaldo = (value) => {
    setSaldo(value.toString())
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Depósito Realizado!</h2>
              <p className="text-muted-foreground">
                Depósito de {formatCurrency(parseFloat(saldo))} realizado com sucesso.
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
              onClick={() => navigate('/principal')}
              className="p-0 h-auto"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl font-bold text-primary flex items-center">
                <ArrowDownCircle className="h-5 w-5 mr-2" />
                Depósito
              </CardTitle>
              <CardDescription>
                Adicione dinheiro à sua conta
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Saldo atual</p>
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
              <Label htmlFor="saldo">Valor do Depósito</Label>
              <Input
                id="saldo"
                name="saldo"
                type="number"
                step="0.01"
                min="0.01"
                max="10000"
                placeholder="R$ 0,00"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Valor máximo: R$ 10.000,00
              </p>
            </div>

            <div className="space-y-2">
              <Label>Valores Rápidos</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickSaldos.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSaldo(value)}
                  >
                    {formatCurrency(value)}
                  </Button>
                ))}
              </div>
            </div>

            {saldo && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>Resumo da operação:</strong>
                </p>
                <p className="text-sm text-green-700">
                  Valor do depósito: {formatCurrency(parseFloat(saldo) || 0)}
                </p>
                <p className="text-sm text-green-700">
                  Saldo após depósito: {formatCurrency(user.saldo + (parseFloat(saldo) || 0))}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !saldo}
              onClick={handleSubmit}
            >
              {isLoading ? (
                'Processando depósito...'
              ) : (
                <>
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Confirmar Depósito
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

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Informações importantes:</strong>
            </p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Depósitos são processados instantaneamente</li>
              <li>• Não há taxa para depósitos</li>
              <li>• Valor máximo por operação: R$ 10.000,00</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

