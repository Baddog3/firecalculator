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

  const annualExpensesAtRetirement =
    monthlyExpenses * 12 * Math.pow(1 + inflation, yearsUntilRetirement);
  const fireNumber = annualExpensesAtRetirement / withdrawalRate;

  const monthlySavingsNeeded = solveMonthlyPayment(
    currentSavings,
    fireNumber,
    annualReturn,
    yearsUntilRetirement
  );

  const yearsToFire = yearsToReachTarget(currentSavings, fireNumber, annualReturn, 0);

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
