import React from 'react';
import { 
  CalculatorInput 
} from '../types';
import { 
  DollarSign, 
  Package, 
  Truck, 
  Box, 
  Percent, 
  Tag, 
  Megaphone, 
  Receipt, 
  MoreHorizontal, 
  RotateCcw, 
  Sparkles,
  Calculator
} from 'lucide-react';

interface CalculatorFormProps {
  input: CalculatorInput;
  onChange: (field: keyof CalculatorInput, value: number | '') => void;
  onClear: () => void;
  onUseExample: () => void;
  onCalculate: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  input,
  onChange,
  onClear,
  onUseExample,
  onCalculate,
}) => {
  const handleInputChange = (field: keyof CalculatorInput, rawValue: string) => {
    if (rawValue === '') {
      onChange(field, '');
      return;
    }

    // Replace comma with dot for standard decimal parsing
    const normalized = rawValue.replace(',', '.');
    const parsed = parseFloat(normalized);

    if (!isNaN(parsed)) {
      onChange(field, Math.max(0, parsed));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Dados da Venda</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Preencha seus custos e as taxas praticadas pelo seu canal de venda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onUseExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Usar exemplo
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCalculate();
        }}
        className="space-y-6"
      >
        {/* Bloco 1: Produto e Venda */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            1. Venda & Custo do Produto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Preço de venda */}
            <div>
              <label 
                htmlFor="precoVenda" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                1. Preço de venda <span className="text-emerald-600">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="precoVenda"
                  placeholder="0,00"
                  value={input.precoVenda}
                  onChange={(e) => handleInputChange('precoVenda', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num font-semibold text-base focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Valor final cobrado do cliente no anúncio</p>
            </div>

            {/* 2. Custo do produto */}
            <div>
              <label 
                htmlFor="custoProduto" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                2. Custo do produto (CMV)
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="custoProduto"
                  placeholder="0,00"
                  value={input.custoProduto}
                  onChange={(e) => handleInputChange('custoProduto', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Quanto você pagou pelo produto no fornecedor</p>
            </div>
          </div>
        </div>

        {/* Bloco 2: Logística e Embalagem */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            2. Envio & Operação
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 3. Frete */}
            <div>
              <label 
                htmlFor="frete" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                3. Frete por sua conta
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="frete"
                  placeholder="0,00"
                  value={input.frete}
                  onChange={(e) => handleInputChange('frete', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Coparticipação no frete grátis ou envio</p>
            </div>

            {/* 4. Embalagem */}
            <div>
              <label 
                htmlFor="embalagem" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                4. Embalagem
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="embalagem"
                  placeholder="0,00"
                  value={input.embalagem}
                  onChange={(e) => handleInputChange('embalagem', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Caixa, envelope de segurança, plástico bolha, fita</p>
            </div>
          </div>
        </div>

        {/* Bloco 3: Taxas do Marketplace */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            3. Taxas do Canal de Venda
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 5. Comissão do marketplace (%) */}
            <div>
              <label 
                htmlFor="comissaoPercentual" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                5. Comissão do marketplace (%)
              </label>
              <div className="relative rounded-xl shadow-xs">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  id="comissaoPercentual"
                  placeholder="Ex: 14"
                  value={input.comissaoPercentual}
                  onChange={(e) => handleInputChange('comissaoPercentual', e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Percentual cobrado pela plataforma (ex: 12%, 14%, 18%)</p>
            </div>

            {/* 6. Taxa fixa */}
            <div>
              <label 
                htmlFor="taxaFixa" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                6. Taxa fixa por unidade vendida
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="taxaFixa"
                  placeholder="0,00"
                  value={input.taxaFixa}
                  onChange={(e) => handleInputChange('taxaFixa', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Taxa por item cobrada por alguns canais (ex: R$ 6,00)</p>
            </div>
          </div>
        </div>

        {/* Bloco 4: Marketing, Impostos e Outros */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            4. Anúncios, Tributos & Custos Extras
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 7. Anúncios/Ads (%) */}
            <div>
              <label 
                htmlFor="adsPercentual" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                7. Anúncios/Ads (%)
              </label>
              <div className="relative rounded-xl shadow-xs">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  id="adsPercentual"
                  placeholder="Ex: 5"
                  value={input.adsPercentual}
                  onChange={(e) => handleInputChange('adsPercentual', e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">ACOS ou percentual de publicidade</p>
            </div>

            {/* 8. Impostos (%) */}
            <div>
              <label 
                htmlFor="impostosPercentual" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                8. Impostos (%)
              </label>
              <div className="relative rounded-xl shadow-xs">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  id="impostosPercentual"
                  placeholder="Ex: 6"
                  value={input.impostosPercentual}
                  onChange={(e) => handleInputChange('impostosPercentual', e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Simples Nacional ou alíquota fiscal</p>
            </div>

            {/* 9. Outros custos */}
            <div>
              <label 
                htmlFor="outrosCustos" 
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
              >
                9. Outros custos
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">R$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="outrosCustos"
                  placeholder="0,00"
                  value={input.outrosCustos}
                  onChange={(e) => handleInputChange('outrosCustos', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50/50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono-num text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Taxas bancárias, devoluções, perdas</p>
            </div>
          </div>
        </div>

        {/* Botão Calcular Principal */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-3 focus:ring-emerald-500/40"
          >
            <Calculator className="w-5 h-5" />
            <span>Calcular Lucro e Margem</span>
          </button>
          <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
            Os cálculos também são atualizados em tempo real conforme você digita.
          </p>
        </div>
      </form>
    </div>
  );
};
