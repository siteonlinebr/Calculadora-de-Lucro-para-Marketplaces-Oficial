export interface CalculatorInput {
  precoVenda: number | '';
  custoProduto: number | '';
  frete: number | '';
  embalagem: number | '';
  comissaoPercentual: number | '';
  taxaFixa: number | '';
  adsPercentual: number | '';
  impostosPercentual: number | '';
  outrosCustos: number | '';
}

export interface CalculationResult {
  precoVenda: number;
  custoProduto: number;
  frete: number;
  embalagem: number;
  outrosCustos: number;
  
  // Taxas e percentuais
  comissaoPercentual: number;
  comissaoValor: number;
  taxaFixa: number;
  adsPercentual: number;
  adsValor: number;
  impostosPercentual: number;
  impostosValor: number;
  
  // Totais
  custosProdutosEEnvio: number;
  custosMarketplaceETributos: number;
  totalCustos: number;
  lucroLiquido: number;
  margemLucroPercentual: number;
  roiPercentual: number;
  pontoEquilibrio: number;
  isLucrativo: boolean;
  temPrejuizo: boolean;
}
