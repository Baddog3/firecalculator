"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CalculatorSection from "@/components/CalculatorSection";
import FireChart from "@/components/FireChart";
import InputSlider from "@/components/InputSlider";
import NumberField from "@/components/NumberField";
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

export default function FireCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [monthlySavingsCurrent, setMonthlySavingsCurrent] = useState(30000);
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
        monthlySavingsCurrent,
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
      monthlySavingsCurrent,
      retirementAge,
      withdrawalRatePercent
    ]
  );

  const chartData = result.rows.map((row) => ({
    age: row.age,
    portfolio: Math.round(row.portfolio)
  }));

  const savingsGap = result.monthlySavingsNeeded - monthlySavingsCurrent;

  return (
    <div className="space-y-8">
      <div
        id="ad-top"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>

      <CalculatorSection title="Ваш профиль" description="Возраст, накопления и текущий уровень расходов.">
        <NumberField
          label="Текущий возраст"
          hint="Сколько вам лет сейчас. От этого считается, сколько лет осталось до желаемого выхода."
          value={currentAge}
          min={18}
          max={80}
          step={1}
          onChange={setCurrentAge}
        />
        <NumberField
          label="Желаемый возраст выхода"
          hint="Возраст, к которому хотите накопить FIRE-капитал и перестать зависеть от зарплаты."
          value={retirementAge}
          min={currentAge + 1}
          max={90}
          step={1}
          onChange={setRetirementAge}
        />
        <NumberField
          label="Текущие накопления ₽"
          hint="Все инвестиции и сбережения, которые уже можно использовать для FIRE: брокерский счёт, ИИС, вклады."
          value={currentSavings}
          min={0}
          step={10000}
          onChange={setCurrentSavings}
        />
        <NumberField
          label="Ежемесячные расходы ₽"
          hint="Сколько вам нужно на жизнь в месяц сейчас: жильё, еда, транспорт, страховки. Не включайте суммы, которые вы откладываете."
          value={monthlyExpenses}
          min={0}
          step={1000}
          onChange={setMonthlyExpenses}
        />
        <NumberField
          label="Откладываете сейчас ₽/мес"
          hint="Сколько вы реально инвестируете каждый месяц уже сегодня. Используется для расчёта «лет до FIRE»."
          value={monthlySavingsCurrent}
          min={0}
          step={1000}
          onChange={setMonthlySavingsCurrent}
        />
      </CalculatorSection>

      <CalculatorSection title="Предположения" description="Ожидания по доходности, инфляции и правилу изъятия.">
        <InputSlider
          label="Ожидаемая доходность"
          hint="Средняя годовая доходность инвестиций до налогов. Для глобального ETF часто используют 7–10%."
          value={annualReturnPercent}
          min={0}
          max={20}
          step={0.1}
          suffix="%"
          onChange={setAnnualReturnPercent}
        />
        <InputSlider
          label="Ставка изъятия"
          hint="Какую долю капитала планируете тратить каждый год после FIRE. Правило 4% означает 4% в год от портфеля."
          value={withdrawalRatePercent}
          min={2}
          max={8}
          step={0.1}
          suffix="%"
          onChange={setWithdrawalRatePercent}
        />
        <InputSlider
          label="Инфляция"
          hint="Ожидаемый рост цен в год. Нужна, чтобы скорректировать расходы к моменту выхода на FIRE."
          value={inflationPercent}
          min={0}
          max={15}
          step={0.1}
          suffix="%"
          onChange={setInflationPercent}
        />
      </CalculatorSection>

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="FIRE-число"
            hint="Размер капитала, которого нужно достичь, чтобы покрывать расходы выбранной ставкой изъятия."
            value={moneyFormat(result.fireNumber)}
            highlight
          />
          <ResultCard
            label="Нужно откладывать в месяц"
            hint="Сумма ежемесячных взносов, чтобы успеть к желаемому возрасту при текущих накоплениях."
            value={moneyFormat(result.monthlySavingsNeeded)}
            subtitle={
              savingsGap > 0
                ? `Не хватает ${moneyFormat(savingsGap)}/мес до цели`
                : savingsGap < 0
                  ? `Запас ${moneyFormat(Math.abs(savingsGap))}/мес`
                  : `До цели: ${result.yearsUntilRetirement} лет`
            }
          />
          <ResultCard
            label="Лет до FIRE"
            hint="Через сколько лет достигнете FIRE-цели при текущем темпе отложений и доходности."
            value={yearsFormat(result.yearsToFire)}
            subtitle={`При ${moneyFormat(monthlySavingsCurrent)}/мес`}
          />
          <ResultCard
            label="Прогноз портфеля к выходу"
            hint="Сколько будет на счёте к желаемому возрасту, если откладывать рекомендованную сумму каждый месяц."
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
          Пунктирная линия — целевой капитал. Точка — момент достижения FIRE при рекомендованных ежемесячных взносах.
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
          <span className="font-mono">{moneyFormat(result.fireNumber)}</span> при ставке изъятия {withdrawalRatePercent}
          %.
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
