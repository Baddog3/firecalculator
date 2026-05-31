"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FireChart from "@/components/FireChart";
import InputSlider from "@/components/InputSlider";
import ResultCard from "@/components/ResultCard";
import { calculateFire } from "@/lib/calculations";

const moneyFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const yearsFormat = (value: number | null) => {
  if (value === null) {
    return "50+ лет";
  }

  if (value === 0) {
    return "Уже достигнуто";
  }

  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 1
  }).format(value);
};

type NumberFieldProps = {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, min = 0, step = 1, onChange }: NumberFieldProps) {
  return (
    <div className="rounded-none border border-border bg-bg-secondary p-4">
      <label className="mb-2 block text-sm">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full border border-border bg-white px-3 py-2 font-mono"
      />
    </div>
  );
}

export default function FireCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [annualReturnPercent, setAnnualReturnPercent] = useState(10);
  const [withdrawalRatePercent, setWithdrawalRatePercent] = useState(4);
  const [inflationPercent, setInflationPercent] = useState(5);

  const result = useMemo(
    () =>
      calculateFire({
        currentAge,
        retirementAge,
        currentSavings,
        monthlyExpenses,
        annualReturnPercent,
        withdrawalRatePercent,
        inflationPercent
      }),
    [
      annualReturnPercent,
      currentAge,
      currentSavings,
      inflationPercent,
      monthlyExpenses,
      retirementAge,
      withdrawalRatePercent
    ]
  );

  const chartData = result.rows.map((row) => ({
    age: row.age,
    portfolio: Math.round(row.portfolio)
  }));

  return (
    <div className="space-y-8">
      <div
        id="ad-top"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>

      <section className="space-y-4">
        <div className="grid gap-4">
          <NumberField label="Текущий возраст" value={currentAge} min={18} step={1} onChange={setCurrentAge} />
          <NumberField
            label="Желаемый возраст выхода"
            value={retirementAge}
            min={currentAge + 1}
            step={1}
            onChange={setRetirementAge}
          />
          <NumberField
            label="Текущие накопления ₽"
            value={currentSavings}
            min={0}
            step={10000}
            onChange={setCurrentSavings}
          />
          <NumberField
            label="Ежемесячные расходы ₽"
            value={monthlyExpenses}
            min={0}
            step={1000}
            onChange={setMonthlyExpenses}
          />

          <InputSlider
            label="Ожидаемая доходность"
            value={annualReturnPercent}
            min={0}
            max={20}
            step={0.1}
            suffix="%"
            onChange={setAnnualReturnPercent}
          />

          <InputSlider
            label="Ставка изъятия"
            value={withdrawalRatePercent}
            min={2}
            max={8}
            step={0.1}
            suffix="%"
            onChange={setWithdrawalRatePercent}
          />

          <InputSlider
            label="Инфляция"
            value={inflationPercent}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            onChange={setInflationPercent}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="FIRE-число" value={moneyFormat(result.fireNumber)} highlight />
          <ResultCard
            label="Нужно откладывать в месяц"
            value={moneyFormat(result.monthlySavingsNeeded)}
            subtitle={`До цели: ${result.yearsUntilRetirement} лет`}
          />
          <ResultCard
            label="Лет до FIRE"
            value={yearsFormat(result.yearsToFire)}
            subtitle="Без дополнительных взносов, только рост капитала"
          />
          <ResultCard
            label="Прогноз портфеля к пенсии"
            value={moneyFormat(result.portfolioAtRetirement)}
            subtitle={`Возраст ${retirementAge} лет`}
          />
        </div>
      </section>

      <div
        id="ad-mid"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>

      <section>
        <h2 className="mb-3 text-xl font-medium">Рост портфеля к FIRE-цели</h2>
        <p className="mb-3 text-sm text-text-muted">
          Пунктирная линия — целевой капитал. Точка — момент достижения FIRE при плановых ежемесячных взносах.
        </p>
        <FireChart
          data={chartData}
          fireTarget={Math.round(result.fireNumber)}
          intersectionAge={result.intersectionAge}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Что такое FIRE</h2>
        <p>
          FIRE (Financial Independence, Retire Early) — подход, при котором вы накапливаете инвестиционный капитал,
          достаточный для покрытия расходов без активного заработка. Цель — не «перестать работать завтра», а получить
          финансовую свободу выбора.
        </p>

        <h3 className="text-lg font-medium">Правило 4%: откуда оно взялось</h3>
        <p>
          Правило появилось из исследования Trinity Study: при изъятии около 4% капитала в год портфель часто
          сохранялся на длинном горизонте. На практике это означает, что для годовых расходов в{" "}
          <span className="font-mono">{moneyFormat(result.annualExpensesAtRetirement)}</span> нужен капитал порядка{" "}
          <span className="font-mono">{moneyFormat(result.fireNumber)}</span> при ставке изъятия{" "}
          {withdrawalRatePercent}%.
        </p>

        <h3 className="text-lg font-medium">Применимость в России и Европе</h3>
        <p>
          В России и Европе логика та же, но важны локальные факторы: инфляция, валюта расходов, налоги и доступные
          инструменты (брокерские счета, ETF, пенсионные программы). Калькулятор учитывает инфляцию расходов к моменту
          выхода на FIRE, поэтому цель ближе к реальности, чем расчёт «в сегодняшних рублях».
        </p>

        <p>
          Чтобы оценить, как капитал растёт с регулярными пополнениями, используйте{" "}
          <Link href="/compound-interest" className="underline">
            калькулятор сложного процента
          </Link>
          .
        </p>
      </section>

      <section className="rounded-none border border-border bg-bg-secondary p-4">
        <p className="text-sm">Ищете брокера для инвестиций?</p>
        <Link href="/blog/sravnenie-brokerov-evropa" className="mt-2 inline-block underline">
          Сравнить брокеров →
        </Link>
      </section>

      <div
        id="ad-bottom"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>
    </div>
  );
}
