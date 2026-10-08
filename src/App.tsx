/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { HowItWorks } from './components/HowItWorks';
import { SpreadsheetCta } from './components/SpreadsheetCta';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { CalculatorInput } from './types';
import { 
  calculateProfit, 
  INITIAL_VALUES, 
  EXAMPLE_VALUES, 
  formatBRL, 
  formatPercent 
} from './utils/calculations';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [input, setInput] = useState<CalculatorInput>(EXAMPLE_VALUES);

  // Cálculo automático e instantâneo
  const result = useMemo(() => calculateProfit(input), [input]);

  const handleFieldChange = (field: keyof CalculatorInput, value: number | '') => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClear = () => {
    setInput(INITIAL_VALUES);
  };

  const handleUseExample = () => {
    setInput(EXAMPLE_VALUES);
  };

  const handleCalculate = () => {
    // Scroll suave para a seção de resultado em dispositivos móveis
    const el = document.getElementById('resultado-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const hotmartOfficialLink = 'https://go.hotmart.com/X107943164W';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="flex-1 max-w-6xl mx-auto px-4 w-full py-6 sm:py-8 space-y-8">
        {/* Banner de Boas-Vindas & Contexto Financeiro */}
        <section className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Descubra quanto realmente sobra de cada venda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Preencha seus custos e as taxas do marketplace para visualizar seu lucro líquido exato e margem real em tempo real.
          </p>
        </section>

        {/* Grid Principal da Calculadora: Formulário + Resultado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Coluna Esquerda: Formulário de Entradas (7 colunas em telas grandes) */}
          <div className="lg:col-span-7">
            <CalculatorForm
              input={input}
              onChange={handleFieldChange}
              onClear={handleClear}
              onUseExample={handleUseExample}
              onCalculate={handleCalculate}
            />
          </div>

          {/* Coluna Direita: Resultados em Destaque (5 colunas em telas grandes, sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ResultCard result={result} />
          </div>
        </div>

        {/* Seção Como Funciona */}
        <HowItWorks />

        {/* Seção Planilha Completa (Hotmart) */}
        <SpreadsheetCta hotmartUrl={hotmartOfficialLink} />
      </main>

      <Footer />
    </div>
  );
}
