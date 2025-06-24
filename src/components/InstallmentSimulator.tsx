
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, CreditCard } from 'lucide-react';
import InstallmentTable from './InstallmentTable';

const InstallmentSimulator = () => {
  const [amount, setAmount] = useState<string>('');
  
  const rates: number[] = [
    1.99, 4.50, 5.00, 5.50, 5.80, 6.20, 6.80, 7.20, 7.80, 8.40, 8.95, 9.49,
    9.99, 12.34, 12.74, 13.14, 13.54, 13.94, 14.34, 14.74, 15.14, 15.54
  ];

  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numbersOnly = value.replace(/\D/g, '');
    
    // Converte para número e divide por 100 (para centavos)
    const numberValue = parseFloat(numbersOnly) / 100;
    
    if (isNaN(numberValue)) return '';
    
    // Formata como moeda brasileira
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setAmount(formatted);
  };

  const getNumericValue = (formattedValue: string): number => {
    const numbersOnly = formattedValue.replace(/\D/g, '');
    return parseFloat(numbersOnly) / 100 || 0;
  };

  const numericAmount = getNumericValue(amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Simulador de Parcelamento
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Calcule as parcelas e taxas do seu pagamento
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-2xl">
              <CreditCard className="w-6 h-6 mr-2" />
              Digite o Valor da Compra
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-md mx-auto">
              <Label htmlFor="amount" className="text-lg font-semibold text-gray-700 mb-2 block">
                Valor Total
              </Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="R$ 0,00"
                className="text-2xl text-center h-14 text-gray-800 font-semibold border-2 border-blue-200 focus:border-blue-500 transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {numericAmount > 0 && (
          <InstallmentTable amount={numericAmount} rates={rates} />
        )}
      </div>
    </div>
  );
};

export default InstallmentSimulator;
