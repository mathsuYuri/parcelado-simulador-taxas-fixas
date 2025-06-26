
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Zap } from 'lucide-react';

interface InstallmentTableProps {
  amount: number;
  rates: number[];
}

const InstallmentTable: React.FC<InstallmentTableProps> = ({ amount, rates }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-2xl">
          <CreditCard className="w-6 h-6 mr-2" />
          Opções de Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 font-semibold text-gray-700">Forma de Pagamento</th>
                <th className="text-center p-4 font-semibold text-gray-700">Parcelas</th>
                <th className="text-center p-4 font-semibold text-gray-700">Taxa</th>
                <th className="text-right p-4 font-semibold text-gray-700">Valor com Taxa</th>
                <th className="text-right p-4 font-semibold text-gray-700">Valor da Parcela</th>
                <th className="text-right p-4 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Débito */}
              <tr className="border-b hover:bg-green-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-gray-800">Débito</span>
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                      Recomendado
                    </Badge>
                  </div>
                </td>
                <td className="p-4 text-center font-semibold text-gray-800">À vista</td>
                <td className="p-4 text-center text-green-600 font-semibold">
                  {rates[0]}%
                </td>
                <td className="p-4 text-right font-bold text-lg text-blue-600">
                  {formatCurrency(amount * (1 - rates[0] / 100))}
                </td>
                <td className="p-4 text-right font-bold text-lg text-gray-800">
                  {formatCurrency(amount / (1 - rates[0] / 100))}
                </td>
                <td className="p-4 text-right font-bold text-lg text-gray-800">
                  {formatCurrency(amount / (1 - rates[0] / 100))}
                </td>
              </tr>

              {/* Parcelado - começando em 1x */}
              {rates.slice(1).map((rate, index) => {
                const installments = index + 1; // Começa em 1x
                const valorParaCliente = amount / (1 - rate / 100);
                const valorComTaxa = amount * (1 - rate / 100);
                const installmentValue = valorParaCliente / installments;
                
                return (
                  <tr 
                    key={installments} 
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-800">Cartão de Crédito</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold text-gray-800">
                      {installments}x
                    </td>
                    <td className="p-4 text-center text-blue-600 font-semibold">
                      {rate}%
                    </td>
                    <td className="p-4 text-right font-bold text-lg text-blue-600">
                      {formatCurrency(valorComTaxa)}
                    </td>
                    <td className="p-4 text-right font-bold text-lg text-gray-800">
                      {formatCurrency(installmentValue)}
                    </td>
                    <td className="p-4 text-right font-bold text-lg text-gray-800">
                      {formatCurrency(valorParaCliente)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallmentTable;
