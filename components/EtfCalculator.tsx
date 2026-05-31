"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
    <div className="space-y-8">
      <div
        id="ad-top"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>

      <CalculatorSection title="Ваши вложения">
        <NumberField
          label="Начальная сумма ₽"
          hint="Сколько уже инвестировано в ETF или готово к первой покупке."
          value={initialAmount}
          min={0}
          step={1000}
          onChange={setInitialAmount}
        />
        <NumberField
          label="Ежемесячное пополнение ₽"
          hint="Регулярная сумма докупок ETF, например через автоплатёж у брокера."
          value={monthlyContribution}
          min={0}
          step={1000}
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

      <CalculatorSection title="Доходность и комиссии">
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

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Итоговая сумма"
            hint="Портфель в конце срока с учётом комиссии фонда TER."
            value={moneyFormat(result.finalNet)}
            highlight
          />
          <ResultCard label="Вложено" hint="Все ваши пополнения и стартовая сумма." value={moneyFormat(result.totalInvested)} />
          <ResultCard label="Прибыль" hint="Итог минус вложенные своими деньгами средства." value={moneyFormat(result.profitNet)} />
          <ResultCard
            label="Доходность"
            hint="Процент роста относительно суммы ваших вложений."
            value={`${percentFormat(result.yieldPercent)}%`}
          />
          <ResultCard
            label="Потери на комиссии"
            hint="Разница между сценарием с TER и без него — «стоимость» низкой/высокой комиссии фонда."
            value={moneyFormat(result.feesImpact)}
            subtitle={`Чистая доходность ≈ ${percentFormat(result.netReturnPercent)}%`}
          />
          <ResultCard
            label="Без учёта TER"
            hint="Гипотетический результат при той же доходности, но без комиссии фонда."
            value={moneyFormat(result.finalGross)}
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
        <h2 className="mb-3 text-xl font-medium">Рост портфеля ETF</h2>
        <p className="mb-3 text-sm text-text-muted">
          Чёрная линия — с учётом TER, серая — тот же сценарий без комиссии фонда.
        </p>
        <CompoundChart
          data={chartData}
          primaryName="С комиссией ETF"
          secondaryName="Без комиссии (брутто)"
        />
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
        <h2 className="text-xl font-medium">ETF и комиссии</h2>
        <p>
          ETF — это фонд, который повторяет индекс (например, акций США или облигаций). Вы покупаете одну «корзину»
          через брокера, а не десятки отдельных бумаг. Для долгосрочного инвестора важны диверсификация и низкие
          издержки.
        </p>
        <p>
          Подробнее — в статье{" "}
          <Link href="/blog/chto-takoe-etf" className="underline">
            «Что такое ETF»
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
