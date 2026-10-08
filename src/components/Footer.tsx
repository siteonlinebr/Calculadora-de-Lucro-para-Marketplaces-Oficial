import React from 'react';
import { Calculator, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            Calculadora de Lucro para Marketplaces
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Cálculo 100% local no seu navegador
          </span>
          <span>•</span>
          <span>Sem cadastro ou cookies de rastreio</span>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-[11px] text-slate-400 dark:text-slate-500">
        Esta ferramenta financeira é independente e calcula os resultados exclusivamente a partir dos valores inseridos manualmente pelo vendedor. Taxas e políticas podem variar conforme o marketplace e categoria.
      </div>
    </footer>
  );
};
