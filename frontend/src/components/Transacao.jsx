
export default function Transacao({ transacao }) {
  const isSaque = transacao.tipoTransacao === 'SAQUE';

  const dataFormatada = new Date(transacao.dataTransacao).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor);

  return (
    <div className="flex justify-between items-center border-b py-2 last:border-none">
      <div>
        <p className="font-semibold">{transacao.tipoTransacao}</p>
        <p className="text-xs text-muted-foreground">{dataFormatada}</p>
      </div>
      <p className={`font-bold ${isSaque ? 'text-red-600' : 'text-green-600'}`}>
        {isSaque ? '-' : '+'} {valorFormatado}
      </p>
    </div>
  );
}
