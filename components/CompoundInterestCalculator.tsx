"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BrokerCta from "@/components/BrokerCta";
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
    <div className="flex flex-col gap-block">
      <CalculatorSection title="Ваши вложения" description="Сколько уже есть и сколько добавляете каждый месяц.">
        <NumberField
          label="Начальная сумма ₽"
          hint="Деньги, которые уже лежат на счёте или в портфеле в момент старта расчёта."
          value={initialAmount}
          min={0}
          step={1000}
          formatThousands
          onChange={setInitialAmount}
        />
        <NumberField
          label="Ежемесячное пополнение"
          hint="Фиксированная сумма, которую планируете добавлять каждый месяц на протяжении всего срока."
          value={monthlyContribution}
          min={0}
          step={1000}
          formatThousands
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
          className="sm:col-span-2"
        />
      </CalculatorSection>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-extrabold sm:text-2xl">Результаты</h2>
        <ResultCard
          variant="hero"
          label="Итоговая сумма"
          hint="Сколько будет на счёте в конце срока с учётом стартовой суммы, пополнений и начисленных процентов."
          value={moneyFormat(result.total)}
          subtitle={`Вложено ${moneyFormat(result.totalInvested)} · прибыль ${moneyFormat(result.profit)} · ${percentFormat(result.yieldPercent)}%`}
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <ResultCard
            variant="compact"
            label="Вложено"
            hint="Сумма ваших денег без учёта процентов: стартовый капитал + все ежемесячные пополнения."
            value={moneyFormat(result.totalInvested)}
          />
          <ResultCard
            variant="compact"
            label="Заработано"
            hint="Чистая прибыль: итоговая сумма минус всё, что вы внесли своими деньгами."
            value={moneyFormat(result.profit)}
            subtitleTone="success"
          />
          <ResultCard
            variant="compact"
            label="Доходность"
            hint="Насколько выросли ваши вложения в процентах относительно суммы, которую вы внесли."
            value={`${percentFormat(result.yieldPercent)}%`}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-base font-semibold">Динамика капитала</h2>
        <p className="mb-3 text-sm text-text-muted">
          Красная линия — с пополнениями, серая — только рост начальной суммы без новых взносов.
        </p>
        <CompoundChart data={chartData} />
      </section>

      <section>
        <button type="button" onClick={() => setShowTable((prev) => !prev)} className="btn-fintech mb-3">
          {showTable ? "Скрыть таблицу по годам" : "Показать таблицу по годам"}
        </button>

        {showTable ? (
          <div className="table-fintech">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-accent/10 text-left">
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
        <h2 className="text-base font-semibold">Что важно знать о сложном проценте</h2>
        <p className="text-sm leading-relaxed">
          Сложный процент — это эффект, при котором прибыль начисляется не только на стартовый капитал, но и на уже
          полученные проценты. Поэтому капитал растёт ускоряющимися темпами на длинной дистанции.
        </p>
        <p className="text-sm leading-relaxed">
          Для долгосрочного инвестора это ключевой механизм: регулярные пополнения и реинвестирование дают заметно
          больший результат, чем попытки угадать идеальную точку входа.
        </p>
        <p className="text-sm leading-relaxed">
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
        <p className="text-sm leading-relaxed">
          Если хотите оценить, когда можно достичь финансовой независимости, используйте{" "}
          <Link href="/fire-calculator" className="link-fintech">
            FIRE-калькулятор
          </Link>
          .
        </p>
      </section>

      <BrokerCta />
    </div>
  );
}
