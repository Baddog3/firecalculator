"use client";

import Link from "@/components/Link";
import { useMemo, useState } from "react";
import BrokerCta from "@/components/BrokerCta";
import CalculatorSection from "@/components/CalculatorSection";
import InputSlider from "@/components/InputSlider";
import NumberField from "@/components/NumberField";
import ResultCard from "@/components/ResultCard";
import SelectField from "@/components/SelectField";
import {
  type EmergencyFundTargetMonths,
  calculateEmergencyFund
} from "@/lib/calculations";

const moneyFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const monthsLabel = (value: number | null) => {
  if (value === null) {
    return "Не достижимо";
  }

  if (value === 0) {
    return "Уже достигнуто";
  }

  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0
  }).format(value);
};

const targetMonthOptions: { value: EmergencyFundTargetMonths; label: string }[] = [
  { value: 3, label: "3 месяца — минимум" },
  { value: 6, label: "6 месяцев — комфортный уровень" },
  { value: 12, label: "12 месяцев — нестабильный доход" }
];

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [currentSavings, setCurrentSavings] = useState(150000);
  const [targetMonths, setTargetMonths] = useState<EmergencyFundTargetMonths>(6);
  const [monthlyContribution, setMonthlyContribution] = useState(20000);
  const [annualReturnPercent, setAnnualReturnPercent] = useState(7);

  const result = useMemo(
    () =>
      calculateEmergencyFund({
        monthlyExpenses,
        currentSavings,
        targetMonths,
        monthlyContribution,
        annualReturnPercent
      }),
    [annualReturnPercent, currentSavings, monthlyContribution, monthlyExpenses, targetMonths]
  );

  const progressLabel = result.isComplete
    ? "Подушка собрана"
    : `${Math.round(result.progressPercent)}% от цели`;

  const monthsSubtitle = result.isComplete
    ? "Можно переходить к инвестициям"
    : result.monthsToTarget === null
      ? "Увеличьте ежемесячный взнос"
      : `При ${moneyFormat(monthlyContribution)}/мес`;

  return (
    <div className="flex flex-col gap-block">
      <div className="calculator-layout">
        <div className="flex flex-col gap-block">
          <CalculatorSection
            title="Ваши расходы и накопления"
            description="Сколько тратите в месяц и что уже отложено на подушку."
          >
            <NumberField
              label="Ежемесячные расходы ₽"
              hint="Только обязательные траты: жильё, еда, транспорт, кредиты, базовые расходы на детей."
              value={monthlyExpenses}
              min={0}
              step={1000}
              formatThousands
              onChange={setMonthlyExpenses}
            />
            <NumberField
              label="Уже накоплено ₽"
              hint="Деньги на быстрый доступ: накопительный счёт, депозит до востребования."
              value={currentSavings}
              min={0}
              step={1000}
              formatThousands
              onChange={setCurrentSavings}
            />
            <SelectField
              label="Цель подушки"
              hint="Сколько месяцев расходов хотите покрыть. 6 месяцев — рекомендуемый минимум для большинства."
              value={String(targetMonths)}
              onChange={(value) => setTargetMonths(Number(value) as EmergencyFundTargetMonths)}
              options={targetMonthOptions.map((option) => ({
                value: String(option.value),
                label: option.label
              }))}
              className="sm:col-span-2"
            />
          </CalculatorSection>

          <CalculatorSection
            title="План накопления"
            description="Сколько откладываете и какую доходность даёт накопительный счёт."
          >
            <NumberField
              label="Ежемесячный взнос ₽"
              hint="Сумма, которую готовы откладывать каждый месяц до достижения цели."
              value={monthlyContribution}
              min={0}
              step={1000}
              formatThousands
              onChange={setMonthlyContribution}
            />
            <InputSlider
              label="Доходность счёта"
              hint="Ориентир для накопительного счёта: 6–8% в спокойный период, выше в кризис."
              value={annualReturnPercent}
              min={0}
              max={25}
              step={0.5}
              suffix="%"
              onChange={setAnnualReturnPercent}
            />
          </CalculatorSection>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
          <h2 className="type-h2">Результаты</h2>
          <ResultCard
            variant="hero"
            label="Целевая подушка"
            hint="Сумма, которая покроет выбранное количество месяцев расходов."
            value={moneyFormat(result.targetAmount)}
            subtitle={`${targetMonths} мес. × ${moneyFormat(monthlyExpenses)}/мес`}
          />

          <div className="card p-card">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-text-muted">Прогресс</span>
              <span className="font-mono tabular-nums text-accent">{progressLabel}</span>
            </div>
            <div
              className="h-3 w-full overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuenow={Math.round(result.progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Прогресс накопления подушки безопасности"
            >
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${result.progressPercent}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Накоплено {moneyFormat(currentSavings)} из {moneyFormat(result.targetAmount)}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ResultCard
              variant="compact"
              label="Осталось накопить"
              hint="Разница между целью и тем, что уже есть на счёте."
              value={moneyFormat(result.remaining)}
              subtitleTone={result.isComplete ? "success" : "default"}
            />
            <ResultCard
              variant="compact"
              label="Срок до цели"
              hint="Сколько месяцев потребуется при текущем взносе и доходности счёта."
              value={monthsLabel(result.monthsToTarget)}
              subtitle={monthsSubtitle}
              subtitleTone={result.isComplete ? "success" : "default"}
            />
          </div>
        </aside>
      </div>

      <section className="prose-blog max-w-prose">
        <h2 className="type-h2 !mt-0">Как пользоваться результатом</h2>
        <p className="text-sm">
          Подушка — это не инвестиции. Держите её на накопительном счёте или в краткосрочных ОФЗ, чтобы деньги были
          доступны за 1–3 дня и не зависели от биржи.
        </p>
        <p className="text-sm">
          Порядок действий: сначала закрыть дорогие долги, затем собрать подушку, и только потом инвестировать в БПИФы
          и акции.
        </p>
        <p className="text-sm">
          Подробный разбор — в статье{" "}
          <Link href="/blog/podushka-bezopasnosti" className="link">
            «Подушка безопасности — что это и сколько нужно»
          </Link>
          . Когда подушка собрана, оцените рост капитала в{" "}
          <Link href="/compound-interest" className="link">
            калькуляторе сложного процента
          </Link>{" "}
          или цель FIRE в{" "}
          <Link href="/fire-calculator" className="link">
            FIRE-калькуляторе
          </Link>
          .
        </p>
      </section>

      <BrokerCta />
    </div>
  );
}
