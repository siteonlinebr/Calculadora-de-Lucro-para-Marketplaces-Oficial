import React from 'react';
import { FileEdit, Percent, DollarSign } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Informe seus custos',
      desc: 'Coloque o custo pago ao fornecedor, embalagem, frete por sua conta e despesas operacionais.',
      icon: FileEdit,
      color: 'bg-blue-50 text-blue-700 border-blue-200/70 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    },
    {
      num: '2',
      title: 'Informe as taxas',
      desc: 'Insira a porcentagem de comissão do marketplace, taxa fixa por venda, investimento em anúncios e impostos.',
      icon: Percent,
      color: 'bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    },
    {
      num: '3',
      title: 'Veja quanto realmente sobra',
      desc: 'Descubra na hora seu lucro líquido real em Reais e a margem percentual para nunca mais vender no prejuízo.',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    },
  ];

  return (
    <section className="py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Como funciona?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Três passos simples para ter clareza total sobre o resultado de cada produto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 relative shadow-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm ${step.color}`}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
