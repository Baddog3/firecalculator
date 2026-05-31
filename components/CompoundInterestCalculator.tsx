"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CalculatorSection from "@/components/CalculatorSection";
import CompoundChart from "@/components/CompoundChart";
import InputSlider from "@/components/InputSlider";
import NumberField from "@/components/NumberField";
import ResultCard from "@/components/ResultCard";
import SelectField from "@/components/SelectField";
import { CompoundFrequency, calculateCompoundInterest } from "@/lib/calculations";

const moneyFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const percentFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [annualRatePercent, setAnnualRatePercent] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState<CompoundFrequency>("yearly");
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        initialAmount,
        monthlyContribution,
        annualRatePercent,
        years,
        frequency
      }),
    [annualRatePercent, frequency, initialAmount, monthlyContribution, years]
  );

  const chartData = result.rows.map((row) => ({
    year: row.year,
    withContributions: Math.round(row.balance),
    withoutContributions: Math.round(row.withoutContributions)
  }));

  return (
    <div className="space-y-8">
      <div id="ad-top" className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted">
        Рекламный блок
      </div>

      <CalculatorSection title="Ваши вложения" description="Сколько уже есть и сколько добавляете каждый месяц.">
        <NumberField
          label="Начальная сумма ₽"
          hint="Деньги, которые уже лежат на счёте или в портфеле в момент старта расчёта."
          value={initialAmount}
          min={0}
          step={1000}
          onChange={setInitialAmount}
        />
        <NumberField
          label="Ежемесячное пополнение"
          hint="Фиксированная сумма, которую планируете добавлять каждый месяц на протяжении всего срока."
          value={monthlyContribution}
          min={0}
          step={1000}
          onChange={setMonthlyContribution}
        />
      </CalculatorSection>

      <CalculatorSection title="Условия роста" description="Ожидания по доходности и сроку инвестирования.">
        <InputSlider
          label="Годовая доходность"
          hint="Средняя ожидаемая доходность в год до налогов. Для консервативного сценария часто берут 6–8%, для акций — около 10%."
          value={annualRatePercent}
          min={0}
          max={30}
          step={0.1}
          suffix="%"
          onChange={setAnnualRatePercent}
        />
        <InputSlider
          label="Срок инвестирования"
          hint="На сколько лет вперёд считаем. Чем длиннее срок, тем сильнее проявляется эффект сложного процента."
          value={years}
          min={1}
          max={50}
          step={1}
          suffix="лет"
          onChange={setYears}
        />
        <SelectField
          label="Периодичность начисления"
          hint="Как часто проценты «прибавляются» к капиталу. Чем чаще начисление, тем чуть выше итог при той же ставке."
          value={frequency}
          onChange={(value) => setFrequency(value as CompoundFrequency)}
          options={[
            { value: "yearly", label: "Ежегодно" },
            { value: "quarterly", label: "Ежеквартально" },
            { value: "monthly", label: "Ежемесячно" }
          ]}
        />
      </CalculatorSection>

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Итоговая сумма"
            hint="Сколько будет на счёте в конце срока с учётом стартовой суммы, пополнений и начисленных процентов."
            value={moneyFormat(result.total)}
            highlight
          />
          <ResultCard
            label="Вложено"
            hint="Сумма ваших денег без учёта процентов: стартовый капитал + все ежемесячные пополнения."
            value={moneyFormat(result.totalInvested)}
          />
          <ResultCard
            label="Заработано"
            hint="Чистая прибыль: итоговая сумма минус всё, что вы внесли своими деньгами."
            value={moneyFormat(result.profit)}
          />
          <ResultCard
            label="Доходность"
            hint="Насколько выросли ваши вложения в процентах относительно суммы, которую вы внесли."
            value={`${percentFormat(result.yieldPercent)}%`}
          />
        </div>
      </section>

      <div id="ad-mid" className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted">
        Рекламный блок
      </div>

      <section>
        <h2 className="mb-3 text-xl font-medium">Динамика капитала</h2>
        <p className="mb-3 text-sm text-text-muted">
          Чёрная линия — с пополнениями, серая — только рост начальной суммы без новых взносов.
        </p>
        <CompoundChart data={chartData} />
      </section>

      <section>
        <button
          type="button"
          onClick={() => setShowTable((prev) => !prev)}
          className="mb-3 border border-border px-3 py-2 text-sm"
        >
          {showTable ? "Скрыть таблицу по годам" : "Показать таблицу по годам"}
        </button>

        {showTable ? (
          <div className="overflow-x-auto border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-bg-secondary text-left">
                  <th className="border-b border-border px-3 py-2">Год</th>
                  <th className="border-b border-border px-3 py-2">Баланс</th>
                  <th className="border-b border-border px-3 py-2">Вложено</th>
                  <th className="border-b border-border px-3 py-2">Прибыль</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.year}>
                    <td className="border-b border-border px-3 py-2">{row.year}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.balance)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.invested)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Что важно знать о сложном проценте</h2>
        <p>
          Сложный процент — это эффект, при котором прибыль начисляется не только на стартовый капитал, но и на уже
          полученные проценты. Поэтому капитал растёт ускоряющимися темпами на длинной дистанции.
        </p>
        <p>
          Для долгосрочного инвестора это ключевой механизм: регулярные пополнения и реинвестирование дают заметно
          больший результат, чем попытки угадать идеальную точку входа.
        </p>
        <p>
          Пример: 100 000 ₽ под 10% на 20 лет превращаются примерно в{" "}
          <span className="font-mono">
            {moneyFormat(
              calculateCompoundInterest({
                initialAmount: 100000,
                monthlyContribution: 0,
                annualRatePercent: 10,
                years: 20,
                frequency: "yearly"
              }).total
            )}
          </span>{" "}
          даже без дополнительных вложений.
        </p>
        <p>
          Если хотите оценить, когда можно достичь финансовой независимости, используйте{" "}
          <Link href="/fire-calculator" className="underline">
            FIRE-калькулятор
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

      <div id="ad-bottom" className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted">
        Рекламный блок
      </div>
    </div>
  );
}
