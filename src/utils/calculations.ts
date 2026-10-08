import { CalculatorInput, CalculationResult } from '../types';

export const EXAMPLE_VALUES: CalculatorInput = {
  precoVenda: 149.90,
  custoProduto: 48.00,
  frete: 19.90,
  embalagem: 3.50,
  comissaoPercentual: 14.0,
  taxaFixa: 6.00,
  adsPercentual: 4.5,
  impostosPercentual: 6.0,
  outrosCustos: 2.00,
};

export const INITIAL_VALUES: CalculatorInput = {
  precoVenda: '',
  custoProduto: '',
  frete: '',
  embalagem: '',
  comissaoPercentual: '',
  taxaFixa: '',
  adsPercentual: '',
  impostosPercentual: '',
  outrosCustos: '',
};

const parseNum = (val: number | '' | undefined): number => {
  if (val === '' || val === undefined || isNaN(Number(val))) {
    return 0;
  }
  return Number(val);
};

export function calculateProfit(input: CalculatorInput): CalculationResult {
  const precoVenda = parseNum(input.precoVenda);
  const custoProduto = parseNum(input.custoProduto);
  const frete = parseNum(input.frete);
  const embalagem = parseNum(input.embalagem);
  const comissaoPercentual = parseNum(input.comissaoPercentual);
  const taxaFixa = parseNum(input.taxaFixa);
  const adsPercentual = parseNum(input.adsPercentual);
  const impostosPercentual = parseNum(input.impostosPercentual);
  const outrosCustos = parseNum(input.outrosCustos);

  // Cálculos percentuais sobre o preço de venda
  const comissaoValor = precoVenda * (comissaoPercentual / 100);
  const adsValor = precoVenda * (adsPercentual / 100);
  const impostosValor = precoVenda * (impostosPercentual / 100);

  // Agrupamentos didáticos
  const custosProdutosEEnvio = custoProduto + frete + embalagem + outrosCustos;
  const custosMarketplaceETributos = comissaoValor + taxaFixa + adsValor + impostosValor;

  // Total de custos
  const totalCustos =
    custoProduto +
    frete +
    embalagem +
    comissaoValor +
    taxaFixa +
    adsValor +
    impostosValor +
    outrosCustos;

  // Lucro líquido
  const lucroLiquido = precoVenda - totalCustos;

  // Margem de lucro (%) = (Lucro Líquido / Preço de Venda) * 100
  const margemLucroPercentual = precoVenda > 0 ? (lucroLiquido / precoVenda) * 100 : 0;

  // Retorno sobre o investimento (ROI em %) = (Lucro Líquido / Total Custos) * 100
  const roiPercentual = totalCustos > 0 ? (lucroLiquido / totalCustos) * 100 : 0;

  // Ponto de equilíbrio (preço mínimo para lucro zero):
  // Preço = CustosFixos / (1 - (somaPercentuais / 100))
  const somaPercentuais = comissaoPercentual + adsPercentual + impostosPercentual;
  const custosAbsolutos = custoProduto + frete + embalagem + taxaFixa + outrosCustos;
  const pontoEquilibrio =
    somaPercentuais < 100
      ? custosAbsolutos / (1 - somaPercentuais / 100)
      : custosAbsolutos;

  return {
    precoVenda,
    custoProduto,
    frete,
    embalagem,
    outrosCustos,
    comissaoPercentual,
    comissaoValor,
    taxaFixa,
    adsPercentual,
    adsValor,
    impostosPercentual,
    impostosValor,
    custosProdutosEEnvio,
    custosMarketplaceETributos,
    totalCustos,
    lucroLiquido,
    margemLucroPercentual,
    roiPercentual,
    pontoEquilibrio,
    isLucrativo: lucroLiquido > 0,
    temPrejuizo: precoVenda > 0 && lucroLiquido < 0,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value) + '%';
}
