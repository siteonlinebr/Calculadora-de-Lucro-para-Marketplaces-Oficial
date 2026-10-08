import React from 'react';
import { Table, ExternalLink, CheckCircle, FileSpreadsheet, ArrowRight } from 'lucide-react';

interface SpreadsheetCtaProps {
  hotmartUrl?: string;
}

export const SpreadsheetCta: React.FC<SpreadsheetCtaProps> = ({
  hotmartUrl = 'https://go.hotmart.com/X107943164W',
}) => {
  return (
    <section className="my-8">
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Versão em Planilha para Múltiplos Produtos</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Quer analisar seus produtos de forma mais completa?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Baixe a Calculadora de Lucro para Marketplaces e tenha uma planilha pronta para comparar produtos, custos, taxas, lucro e margem.
          </p>

          {/* Destaques da planilha */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left text-xs max-w-xl mx-auto">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">Comparação em massa</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">Histórico de catálogo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">Pronta para uso</span>
            </div>
          </div>

          {/* Botão Oficial com Link da Hotmart */}
          <div className="pt-3">
            <a
              href={hotmartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 cursor-pointer uppercase tracking-wide group"
            >
              <span>QUERO A PLANILHA COMPLETA</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Acesso imediato e seguro através da Hotmart.
          </p>
        </div>
      </div>
    </section>
  );
};
