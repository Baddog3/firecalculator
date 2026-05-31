export type CompoundFrequency = "yearly" | "quarterly" | "monthly";

export type CompoundInput = {
  initialAmount: number;
  monthlyContribution: number;
  annualRatePercent: number;
  years: number;
  frequency: CompoundFrequency;
};

export type CompoundYearRow = {
  year: number;
  balance: number;
  invested: number;
  profit: number;
  withoutContributions: number;
};

const frequencyMap: Record<CompoundFrequency, number> = {
  yearly: 1,
  quarterly: 4,
  monthly: 12
};

export function calculateCompoundInterest(input: CompoundInput) {
  const principal = Math.max(0, input.initialAmount);
  const annualRate = Math.max(0, input.annualRatePercent) / 100;
  const years = Math.max(1, Math.floor(input.years));
  const n = frequencyMap[input.frequency];
  const pmtPerPeriod = (Math.max(0, input.monthlyContribution) * 12) / n;

  const rows: CompoundYearRow[] = [];

  for (let year = 1; year <= years; year += 1) {
    const periods = n * year;
    const periodRate = annualRate / n;
    const growthFactor = Math.pow(1 + periodRate, periods);

    const futurePrincipal = principal * growthFactor;
    const futureContributions =
      annualRate === 0 ? pmtPerPeriod * periods : pmtPerPeriod * ((growthFactor - 1) / periodRate);
    const balance = futurePrincipal + futureContributions;

    const withoutContributions = futurePrincipal;
    const invested = principal + input.monthlyContribution * 12 * year;

    rows.push({
      year,
      balance,
      invested,
      profit: balance - invested,
      withoutContributions
    });
  }

  const last = rows[rows.length - 1];
  const totalInvested = last?.invested ?? principal;
  const total = last?.balance ?? principal;
  const profit = total - totalInvested;
  const yieldPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

  return {
    total,
    totalInvested,
    profit,
    yieldPercent,
    rows
  };
}

export type FireInput = {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyExpenses: number;
  monthlySavingsCurrent: number;
  annualReturnPercent: number;
  withdrawalRatePercent: number;
  inflationPercent: number;
};

export type FireYearRow = {
  year: number;
  age: number;
  portfolio: number;
};

export type FireResult = {
  fireNumber: number;
  annualExpensesAtRetirement: number;
  monthlySavingsNeeded: number;
  yearsToFire: number | null;
  portfolioAtRetirement: number;
  yearsUntilRetirement: number;
  rows: FireYearRow[];
  intersectionAge: number | null;
};

function solveMonthlyPayment(
  principal: number,
  target: number,
  annualRate: number,
  years: number
): number {
  const months = years * 12;
  const monthlyRate = annualRate / 12;
  const futurePrincipal = principal * Math.pow(1 + monthlyRate, months);
  const gap = target - futurePrincipal;

  if (gap <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return gap / months;
  }

  const annuityFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return gap / annuityFactor;
}

function yearsToReachTarget(
  principal: number,
  target: number,
  annualRate: number,
  monthlyContribution: number
): number | null {
  if (principal >= target) {
    return 0;
  }

  const monthlyRate = annualRate / 12;
  let portfolio = principal;
  const maxYears = 100;

  for (let year = 1; year <= maxYears; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      portfolio = portfolio * (1 + monthlyRate) + monthlyContribution;
    }

    if (portfolio >= target) {
      return year;
    }
  }

  return null;
}

function simulateFirePortfolio(
  currentAge: number,
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): FireYearRow[] {
  const monthlyRate = annualRate / 12;
  const rows: FireYearRow[] = [{ year: 0, age: currentAge, portfolio: principal }];
  let portfolio = principal;

  for (let year = 1; year <= years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      portfolio = portfolio * (1 + monthlyRate) + monthlyContribution;
    }

    rows.push({
      year,
      age: currentAge + year,
      portfolio
    });
  }

  return rows;
}

export function calculateFire(input: FireInput): FireResult {
  const currentAge = Math.max(1, Math.floor(input.currentAge));
  const retirementAge = Math.max(currentAge + 1, Math.floor(input.retirementAge));
  const yearsUntilRetirement = retirementAge - currentAge;

  const inflation = Math.max(0, input.inflationPercent) / 100;
  const annualReturn = Math.max(0, input.annualReturnPercent) / 100;
  const withdrawalRate = Math.max(0.01, input.withdrawalRatePercent) / 100;

  const monthlyExpenses = Math.max(0, input.monthlyExpenses);
  const currentSavings = Math.max(0, input.currentSavings);
  const monthlySavingsCurrent = Math.max(0, input.monthlySavingsCurrent);

  const annualExpensesAtRetirement =
    monthlyExpenses * 12 * Math.pow(1 + inflation, yearsUntilRetirement);
  const fireNumber = annualExpensesAtRetirement / withdrawalRate;

  const monthlySavingsNeeded = solveMonthlyPayment(
    currentSavings,
    fireNumber,
    annualReturn,
    yearsUntilRetirement
  );

  const yearsToFire = yearsToReachTarget(
    currentSavings,
    fireNumber,
    annualReturn,
    monthlySavingsCurrent
  );

  const rows = simulateFirePortfolio(
    currentAge,
    currentSavings,
    monthlySavingsNeeded,
    annualReturn,
    yearsUntilRetirement
  );

  const portfolioAtRetirement = rows[rows.length - 1]?.portfolio ?? currentSavings;

  let intersectionAge: number | null = null;
  for (const row of rows) {
    if (row.portfolio >= fireNumber) {
      intersectionAge = row.age;
      break;
    }
  }

  return {
    fireNumber,
    annualExpensesAtRetirement,
    monthlySavingsNeeded,
    yearsToFire,
    portfolioAtRetirement,
    yearsUntilRetirement,
    rows,
    intersectionAge
  };
}

export type RentVsBuyInput = {
  homePrice: number;
  downPayment: number;
  mortgageRatePercent: number;
  mortgageYears: number;
  comparisonYears: number;
  monthlyRent: number;
  rentIncreasePercent: number;
  homeAppreciationPercent: number;
  maintenancePercent: number;
  investmentReturnPercent: number;
};

export type RentVsBuyYearRow = {
  year: number;
  buyerNetWorth: number;
  renterNetWorth: number;
  rentPaidCumulative: number;
  buyPaidCumulative: number;
  homeValue: number;
  loanBalance: number;
};

export type RentVsBuyResult = {
  monthlyMortgagePayment: number;
  loanAmount: number;
  totalRentPaid: number;
  totalBuyPaid: number;
  buyerNetWorth: number;
  renterNetWorth: number;
  wealthDifference: number;
  winner: "buy" | "rent" | "tie";
  breakEvenYear: number | null;
  homeValueAtEnd: number;
  rows: RentVsBuyYearRow[];
};

function getMonthlyMortgagePayment(loanAmount: number, annualRate: number, years: number): number {
  const months = years * 12;
  const monthlyRate = annualRate / 12;

  if (loanAmount <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return loanAmount / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const homePrice = Math.max(0, input.homePrice);
  const downPayment = Math.min(Math.max(0, input.downPayment), homePrice);
  const mortgageYears = Math.max(1, Math.floor(input.mortgageYears));
  const comparisonYears = Math.max(1, Math.floor(input.comparisonYears));

  const mortgageRate = Math.max(0, input.mortgageRatePercent) / 100;
  const rentIncrease = Math.max(0, input.rentIncreasePercent) / 100;
  const homeAppreciation = Math.max(0, input.homeAppreciationPercent) / 100;
  const maintenanceRate = Math.max(0, input.maintenancePercent) / 100;
  const investmentReturn = Math.max(0, input.investmentReturnPercent) / 100;
  const monthlyInvestmentRate = investmentReturn / 12;

  const loanAmount = homePrice - downPayment;
  const monthlyMortgagePayment = getMonthlyMortgagePayment(loanAmount, mortgageRate, mortgageYears);
  const monthlyMortgageRate = mortgageRate / 12;

  let homeValue = homePrice;
  let loanBalance = loanAmount;
  let rentMonthly = Math.max(0, input.monthlyRent);
  let renterPortfolio = downPayment;
  let rentPaidCumulative = 0;
  let buyPaidCumulative = downPayment;

  const rows: RentVsBuyYearRow[] = [
    {
      year: 0,
      buyerNetWorth: homeValue - loanBalance,
      renterNetWorth: renterPortfolio,
      rentPaidCumulative: 0,
      buyPaidCumulative: downPayment,
      homeValue,
      loanBalance
    }
  ];

  let breakEvenYear: number | null = null;

  for (let year = 1; year <= comparisonYears; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      const mortgagePayment = loanBalance > 0 ? monthlyMortgagePayment : 0;
      if (loanBalance > 0 && mortgagePayment > 0) {
        const interestPart = loanBalance * monthlyMortgageRate;
        const principalPart = Math.min(loanBalance, Math.max(0, mortgagePayment - interestPart));
        loanBalance = Math.max(0, loanBalance - principalPart);
      }

      const maintenancePayment = (homeValue * maintenanceRate) / 12;
      const buyerHousingCost = mortgagePayment + maintenancePayment;
      rentPaidCumulative += rentMonthly;
      buyPaidCumulative += buyerHousingCost;

      renterPortfolio *= 1 + monthlyInvestmentRate;
      renterPortfolio -= rentMonthly;
      if (buyerHousingCost > rentMonthly) {
        renterPortfolio += buyerHousingCost - rentMonthly;
      }
    }

    homeValue *= 1 + homeAppreciation;
    rentMonthly *= 1 + rentIncrease;

    const buyerNetWorth = homeValue - loanBalance;
    const renterNetWorth = Math.max(0, renterPortfolio);

    rows.push({
      year,
      buyerNetWorth,
      renterNetWorth,
      rentPaidCumulative,
      buyPaidCumulative,
      homeValue,
      loanBalance
    });

    if (breakEvenYear === null && buyerNetWorth > renterNetWorth) {
      breakEvenYear = year;
    }
  }

  const last = rows[rows.length - 1];
  const buyerNetWorth = last?.buyerNetWorth ?? 0;
  const renterNetWorth = last?.renterNetWorth ?? 0;
  const wealthDifference = buyerNetWorth - renterNetWorth;

  let winner: RentVsBuyResult["winner"] = "tie";
  if (wealthDifference > 1000) {
    winner = "buy";
  } else if (wealthDifference < -1000) {
    winner = "rent";
  }

  return {
    monthlyMortgagePayment,
    loanAmount,
    totalRentPaid: last?.rentPaidCumulative ?? 0,
    totalBuyPaid: last?.buyPaidCumulative ?? 0,
    buyerNetWorth,
    renterNetWorth,
    wealthDifference,
    winner,
    breakEvenYear,
    homeValueAtEnd: last?.homeValue ?? homePrice,
    rows
  };
}

export type EtfInput = {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  grossReturnPercent: number;
  terPercent: number;
};

export type EtfYearRow = {
  year: number;
  balanceNet: number;
  balanceGross: number;
  invested: number;
  feesImpact: number;
};

export type EtfResult = {
  finalNet: number;
  finalGross: number;
  totalInvested: number;
  profitNet: number;
  yieldPercent: number;
  feesImpact: number;
  netReturnPercent: number;
  rows: EtfYearRow[];
};

export function calculateEtf(input: EtfInput): EtfResult {
  const years = Math.max(1, Math.floor(input.years));
  const initialAmount = Math.max(0, input.initialAmount);
  const monthlyContribution = Math.max(0, input.monthlyContribution);
  const grossReturn = Math.max(0, input.grossReturnPercent) / 100;
  const ter = Math.max(0, input.terPercent) / 100;

  const monthlyGross = grossReturn / 12;
  const monthlyNet = monthlyGross - ter / 12;

  let balanceNet = initialAmount;
  let balanceGross = initialAmount;
  const rows: EtfYearRow[] = [];

  for (let year = 1; year <= years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      balanceNet *= 1 + monthlyNet;
      balanceNet += monthlyContribution;
      balanceGross *= 1 + monthlyGross;
      balanceGross += monthlyContribution;
    }

    const invested = initialAmount + monthlyContribution * 12 * year;
    rows.push({
      year,
      balanceNet,
      balanceGross,
      invested,
      feesImpact: balanceGross - balanceNet
    });
  }

  const last = rows[rows.length - 1];
  const finalNet = last?.balanceNet ?? initialAmount;
  const finalGross = last?.balanceGross ?? initialAmount;
  const totalInvested = last?.invested ?? initialAmount;
  const profitNet = finalNet - totalInvested;
  const yieldPercent = totalInvested > 0 ? (profitNet / totalInvested) * 100 : 0;
  const feesImpact = finalGross - finalNet;
  const netReturnPercent = Math.max(0, input.grossReturnPercent - input.terPercent);

  return {
    finalNet,
    finalGross,
    totalInvested,
    profitNet,
    yieldPercent,
    feesImpact,
    netReturnPercent,
    rows
  };
}
