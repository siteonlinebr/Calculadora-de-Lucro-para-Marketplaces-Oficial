import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { formatBRL, formatPercent } from '../utils/calculations';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  PieChart, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const hasData = result.precoVenda > 0;
  const isLoss = result.temPrejuizo;
  const isZero = !hasData;

  const handleCopySummary = () => {
    const text = `📊 Resumo do Lucro - Marketplace
Preço de Venda: ${formatBRL(result.precoVenda)}
Custo do Produto: ${formatBRL(result.custoProduto)}
Frete + Embalagem: ${formatBRL(result.frete + result.embalagem)}
Comissão (${result.comissaoPercentual}%): ${formatBRL(result.comissaoValor)}
Taxa Fixa: ${formatBRL(result.taxaFixa)}
Ads (${result.adsPercentual}%): ${formatBRL(result.adsValor)}
Impostos (${result.impostosPercentual}%): ${formatBRL(result.impostosValor)}
Outros Custos: ${formatBRL(result.outrosCustos)}
------------------------------
Total de Custos: ${formatBRL(result.totalCustos)}
💰 SEU LUCRO: ${formatBRL(result.lucroLiquido)}
📈 MARGEM: ${formatPercent(result.margemLucroPercentual)}
Calculado com a Calculadora de Lucro para Marketplaces`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Percentuais de composição do preço para a barra visual
  const custoProdPct = hasData ? Math.min(100, Math.max(0, (result.custoProduto / result.precoVenda) * 100)) : 0;
  const freteEmbPct = hasData ? Math.min(100, Math.max(0, ((result.frete + result.embalagem) / result.precoVenda) * 100)) : 0;
  const taxasAdsImpostosPct = hasData ? Math.min(100, Math.max(0, (result.custosMarketplaceETributos / result.precoVenda) * 100)) : 0;
  const outrosPct = hasData ? Math.min(100, Math.max(0, (result.outrosCustos / result.precoVenda) * 100)) : 0;
  const lucroPct = hasData && !isLoss ? Math.min(100, Math.max(0, result.margemLucroPercentual)) : 0;

  return (
    <div id="resultado-section" className="space-y-4">
      {/* Card Principal de Destaque com SEU LUCRO e MARGEM */}
      <div 
        className={`rounded-2xl border p-6 sm:p-7 shadow-sm transition-all ${
          isLoss
            ? 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
            : isZero
            ? 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
            : 'bg-emerald-50/60 dark:bg-emerald-950/25 border-emerald-200/90 dark:border-emerald-800/60'
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Resultado da Venda
            </span>
            {hasData && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLoss
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                }`}
              >
                {isLoss ? 'Venda com Prejuízo' : 'Operação Lucrativa'}
              </span>
            )}
          </div>

          {hasData && (
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors cursor-pointer shadow-2xs"
              title="Copiar resumo completo"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Os 2 DESTAQUES PRINCIPAIS SOLICITADOS: SEU LUCRO e MARGEM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. SEU LUCRO */}
          <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                SEU LUCRO
              </span>
              {isLoss ? (
                <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              ) : (
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              )}
            </div>
            <div
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono-num tracking-tight mt-1 ${
                isLoss
                  ? 'text-rose-600 dark:text-rose-400'
                  : isZero
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {formatBRL(result.lucroLiquido)}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              {isLoss
                ? 'Você está perdendo dinheiro nesta venda!'
                : 'Valor líquido que sobra no seu bolso por unidade'}
            </p>
          </div>

          {/* 2. MARGEM */}
          <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                MARGEM
              </span>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <div
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono-num tracking-tight mt-1 ${
                isLoss
                  ? 'text-rose-600 dark:text-rose-400'
                  : isZero
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {formatPercent(result.margemLucroPercentual)}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Margem líquida sobre o preço final de venda
            </p>
          </div>
        </div>

        {/* Alerta inteligente caso haja prejuízo */}
        {isLoss && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-100/90 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <div>
              <span className="font-bold">Atenção ao prejuízo: </span>
              Seus custos totais superam o preço anunciado. Para empatar (lucro zero), seu preço de venda precisa ser de no mínimo{' '}
              <strong className="underline font-mono-num">{formatBRL(result.pontoEquilibrio)}</strong>.
            </div>
          </div>
        )}
      </div>

      {/* Detalhamento Completo dos Valores Calculados */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          Detalhamento de Custos e Taxas
        </h3>

        {/* Visual Bar: Composição do Preço de Venda */}
        {hasData && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Divisão do Preço de Venda:</span>
              <span className="font-bold font-mono-num text-slate-800 dark:text-slate-200">
                {formatBRL(result.precoVenda)} (100%)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${custoProdPct}%` }} 
                className="bg-blue-500 h-full" 
                title={`Produto: ${formatBRL(result.custoProduto)}`} 
              />
              <div 
                style={{ width: `${freteEmbPct}%` }} 
                className="bg-indigo-400 h-full" 
                title={`Frete + Embalagem: ${formatBRL(result.frete + result.embalagem)}`} 
              />
              <div 
                style={{ width: `${taxasAdsImpostosPct}%` }} 
                className="bg-amber-500 h-full" 
                title={`Taxas + Ads + Impostos: ${formatBRL(result.custosMarketplaceETributos)}`} 
              />
              <div 
                style={{ width: `${outrosPct}%` }} 
                className="bg-slate-400 h-full" 
                title={`Outros: ${formatBRL(result.outrosCustos)}`} 
              />
              {lucroPct > 0 && (
                <div 
                  style={{ width: `${lucroPct}%` }} 
                  className="bg-emerald-500 h-full" 
                  title={`Lucro: ${formatBRL(result.lucroLiquido)}`} 
                />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Produto
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Frete/Embalagem
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Taxas/Ads/Impostos
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lucro
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
          {/* Preço de venda */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-600 dark:text-slate-300 font-semibold">Preço de Venda</span>
            <span className="font-mono-num font-bold text-slate-900 dark:text-white">
              {formatBRL(result.precoVenda)}
            </span>
          </div>

          {/* Custo do produto */}
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-slate-500 dark:text-slate-400">Custo do produto</span>
            <span className="font-mono-num text-slate-700 dark:text-slate-300">
              {formatBRL(result.custoProduto)}
            </span>
          </div>

          {/* Frete & Embalagem */}
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-slate-500 dark:text-slate-400">Frete + Embalagem</span>
            <span className="font-mono-num text-slate-700 dark:text-slate-300">
              {formatBRL(result.frete + result.embalagem)}
            </span>
          </div>

          {/* Valor da comissão */}
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Valor da comissão</span>
              {result.comissaoPercentual > 0 && (
                <span className="text-[10px] text-slate-400 font-mono-num">
                  ({result.comissaoPercentual}%)
                </span>
              )}
            </div>
            <span className="font-mono-num font-medium text-slate-800 dark:text-slate-200">
              {formatBRL(result.comissaoValor)}
            </span>
          </div>

          {/* Taxa fixa */}
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-slate-500 dark:text-slate-400">Taxa fixa do marketplace</span>
            <span className="font-mono-num text-slate-700 dark:text-slate-300">
              {formatBRL(result.taxaFixa)}
            </span>
          </div>

          {/* Valor dos anúncios */}
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Valor dos anúncios (Ads)</span>
              {result.adsPercentual > 0 && (
                <span className="text-[10px] text-slate-400 font-mono-num">
                  ({result.adsPercentual}%)
                </span>
              )}
            </div>
            <span className="font-mono-num font-medium text-slate-800 dark:text-slate-200">
              {formatBRL(result.adsValor)}
            </span>
          </div>

          {/* Valor dos impostos */}
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Valor dos impostos</span>
              {result.impostosPercentual > 0 && (
                <span className="text-[10px] text-slate-400 font-mono-num">
                  ({result.impostosPercentual}%)
                </span>
              )}
            </div>
            <span className="font-mono-num font-medium text-slate-800 dark:text-slate-200">
              {formatBRL(result.impostosValor)}
            </span>
          </div>

          {/* Outros custos */}
          {result.outrosCustos > 0 && (
            <div className="flex items-center justify-between pt-2.5">
              <span className="text-slate-500 dark:text-slate-400">Outros custos</span>
              <span className="font-mono-num text-slate-700 dark:text-slate-300">
                {formatBRL(result.outrosCustos)}
              </span>
            </div>
          )}

          {/* TOTAL DE CUSTOS */}
          <div className="flex items-center justify-between pt-3 bg-slate-50/80 dark:bg-slate-800/40 p-2.5 rounded-lg -mx-2.5">
            <span className="font-bold text-slate-800 dark:text-slate-200">Total de custos</span>
            <span className="font-mono-num font-bold text-slate-900 dark:text-white text-base">
              {formatBRL(result.totalCustos)}
            </span>
          </div>
        </div>

        {/* Indicadores adicionais úteis para o vendedor */}
        {hasData && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Ponto de Equilíbrio</span>
              <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                {formatBRL(result.pontoEquilibrio)}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Retorno (ROI)</span>
              <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                {formatPercent(result.roiPercentual)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
