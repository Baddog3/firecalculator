"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BrokerCta from "@/components/BrokerCta";
import CalculatorSection from "@/components/CalculatorSection";
import CompoundChart from "@/components/CompoundChart";
import InputSlider from "@/components/InputSlider";
import NumberField from "@/components/NumberField";
import ResultCard from "@/components/ResultCard";
import { calculateEtf } from "@/lib/calculations";

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

export default function EtfCalculator() {
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [years, setYears] = useState(15);
  const [grossReturnPercent, setGrossReturnPercent] = useState(10);
  const [terPercent, setTerPercent] = useState(0.2);
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(
    () =>
      calculateEtf({
        initialAmount,
        monthlyContribution,
        years,
        grossReturnPercent,
        terPercent
      }),
    [grossReturnPercent, initialAmount, monthlyContribution, terPercent, years]
  );

  const chartData = result.rows.map((row) => ({
    year: row.year,
    withContributions: Math.round(row.balanceNet),
    withoutContributions: Math.round(row.balanceGross)
  }));

  return (
    <div className="space-y-6">
      <CalculatorSection title="Ваши вложения" description="Стартовая сумма, пополнения и срок.">
        <NumberField
          label="Начальная сумма ₽"
          hint="Сколько уже инвестировано в ETF или готово к первой покупке."
          value={initialAmount}
          min={0}
          step={1000}
          formatThousands
          onChange={setInitialAmount}
        />
        <NumberField
          label="Ежемесячное пополнение ₽"
          hint="Регулярная сумма докупок ETF, например через автоплатёж у брокера."
          value={monthlyContribution}
          min={0}
          step={1000}
          formatThousands
          onChange={setMonthlyContribution}
        />
        <InputSlider
          label="Срок инвестирования"
          hint="На сколько лет планируете держать стратегию. ETF обычно выбирают для горизонта от 5–7 лет."
          value={years}
          min={1}
          max={40}
          step={1}
          suffix="лет"
          onChange={setYears}
        />
      </CalculatorSection>

      <CalculatorSection title="Доходность и комиссии" description="Ожидания по доходности и TER фонда.">
        <InputSlider
          label="Ожидаемая доходность (брутто)"
          hint="Средняя доходность фонда до вычета комиссии и налогов. Для широкого индексного ETF часто берут 8–12%."
          value={grossReturnPercent}
          min={0}
          max={25}
          step={0.1}
          suffix="%"
          onChange={setGrossReturnPercent}
        />
        <InputSlider
          label="Комиссия фонда (TER)"
          hint="Total Expense Ratio — годовая комиссия управляющей компании. У популярных ETF обычно 0,07–0,3%."
          value={terPercent}
          min={0}
          max={3}
          step={0.05}
          suffix="%"
          onChange={setTerPercent}
        />
      </CalculatorSection>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">Результаты</h2>
        <ResultCard
          variant="hero"
          label="Итоговая сумма"
          hint="Портфель в конце срока с учётом комиссии фонда TER."
          value={moneyFormat(result.finalNet)}
          subtitle={`Вложено ${moneyFormat(result.totalInvested)} · прибыль ${moneyFormat(result.profitNet)} · ${percentFormat(result.yieldPercent)}%`}
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <ResultCard
            variant="compact"
            label="Прибыль"
            hint="Итог минус вложенные своими деньгами средства."
            value={moneyFormat(result.profitNet)}
            subtitleTone="success"
          />
          <ResultCard
            variant="compact"
            label="Потери на TER"
            hint="Разница между сценарием с TER и без него — «стоимость» комиссии фонда."
            value={moneyFormat(result.feesImpact)}
            subtitle={`Чистая доходность ≈ ${percentFormat(result.netReturnPercent)}%`}
            subtitleTone="warning"
          />
          <ResultCard
            variant="compact"
            label="Без учёта TER"
            hint="Гипотетический результат при той же доходности, но без комиссии фонда."
            value={moneyFormat(result.finalGross)}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-base font-semibold">Рост портфеля ETF</h2>
        <p className="mb-3 text-sm text-text-muted">
          Красная линия — с учётом TER, серая — тот же сценарий без комиссии фонда.
        </p>
        <CompoundChart
          data={chartData}
          primaryName="С комиссией ETF"
          secondaryName="Без комиссии (брутто)"
        />
      </section>

      <section>
        <button type="button" onClick={() => setShowTable((prev) => !prev)} className="btn-fintech mb-3">
          {showTable ? "Скрыть таблицу по годам" : "Показать таблицу по годам"}
        </button>

        {showTable ? (
          <div className="table-fintech">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 text-left">
                  <th className="border-b border-border px-3 py-2">Год</th>
                  <th className="border-b border-border px-3 py-2">С TER</th>
                  <th className="border-b border-border px-3 py-2">Без TER</th>
                  <th className="border-b border-border px-3 py-2">Вложено</th>
                  <th className="border-b border-border px-3 py-2">Комиссии</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.year}>
                    <td className="border-b border-border px-3 py-2">{row.year}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.balanceNet)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.balanceGross)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.invested)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.feesImpact)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">ETF и комиссии</h2>
        <p className="text-sm leading-relaxed">
          ETF — это фонд, который повторяет индекс (например, акций США или облигаций). Вы покупаете одну «корзину»
          через брокера, а не десятки отдельных бумаг. Для долгосрочного инвестора важны диверсификация и низкие
          издержки.
        </p>
        <p className="text-sm leading-relaxed">
          Подробнее — в статье{" "}
          <Link href="/blog/chto-takoe-etf" className="link-fintech">
            «Что такое ETF»
          </Link>
          .
        </p>
      </section>

      <BrokerCta />
    </div>
  );
}
