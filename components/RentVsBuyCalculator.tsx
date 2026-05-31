"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CalculatorSection from "@/components/CalculatorSection";
import InputSlider from "@/components/InputSlider";
import NumberField from "@/components/NumberField";
import RentVsBuyChart from "@/components/RentVsBuyChart";
import ResultCard from "@/components/ResultCard";
import { calculateRentVsBuy } from "@/lib/calculations";

const moneyFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const percentFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 1
  }).format(value);

const winnerLabel = (winner: "buy" | "rent" | "tie") => {
  if (winner === "buy") return "Покупка";
  if (winner === "rent") return "Аренда";
  return "Примерно одинаково";
};

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(8000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRatePercent, setMortgageRatePercent] = useState(16);
  const [mortgageYears, setMortgageYears] = useState(20);
  const [comparisonYears, setComparisonYears] = useState(10);
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [rentIncreasePercent, setRentIncreasePercent] = useState(5);
  const [homeAppreciationPercent, setHomeAppreciationPercent] = useState(3);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(10);
  const [showTable, setShowTable] = useState(false);

  const downPayment = Math.round((homePrice * downPaymentPercent) / 100);

  const setHomePriceSafe = (value: number) => {
    setHomePrice(Math.max(0, value));
  };

  const result = useMemo(
    () =>
      calculateRentVsBuy({
        homePrice,
        downPayment,
        mortgageRatePercent,
        mortgageYears,
        comparisonYears,
        monthlyRent,
        rentIncreasePercent,
        homeAppreciationPercent,
        maintenancePercent,
        investmentReturnPercent
      }),
    [
      comparisonYears,
      downPayment,
      homeAppreciationPercent,
      homePrice,
      investmentReturnPercent,
      maintenancePercent,
      monthlyRent,
      mortgageRatePercent,
      mortgageYears,
      rentIncreasePercent
    ]
  );

  const chartData = result.rows.map((row) => ({
    year: row.year,
    buyerNetWorth: Math.round(row.buyerNetWorth),
    renterNetWorth: Math.round(row.renterNetWorth)
  }));

  const breakEvenText =
    result.breakEvenYear === null ? "Не наступает за период" : `${result.breakEvenYear} год`;

  const priceToRent =
    monthlyRent > 0 ? homePrice / (monthlyRent * 12) : null;

  return (
    <div className="space-y-8">
      <div
        id="ad-top"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>

      <CalculatorSection title="Покупка жилья" description="Стоимость квартиры, взнос и условия ипотеки.">
        <NumberField
          label="Стоимость жилья ₽"
          hint="Полная цена квартиры или дома, которую рассматриваете к покупке."
          value={homePrice}
          min={0}
          step={100000}
          onChange={setHomePriceSafe}
        />
        <InputSlider
          label="Первоначальный взнос"
          hint="Доля цены, которую платите сразу из своих денег. Остальное — сумма ипотеки."
          value={downPaymentPercent}
          min={0}
          max={90}
          step={1}
          suffix="%"
          onChange={setDownPaymentPercent}
        />
        <NumberField
          label="Сумма взноса ₽"
          hint="Рассчитывается автоматически из процента. Эти деньги у арендатора могли бы работать в инвестициях."
          value={downPayment}
          min={0}
          step={50000}
          helperText={`${percentFormat(downPaymentPercent)}% от стоимости`}
          onChange={(value) => {
            if (homePrice > 0) {
              setDownPaymentPercent(Math.min(90, Math.max(0, (value / homePrice) * 100)));
            }
          }}
        />
        <InputSlider
          label="Ставка ипотеки"
          hint="Годовая процентная ставка по кредиту. Указывайте актуальную ставку вашего банка."
          value={mortgageRatePercent}
          min={1}
          max={25}
          step={0.1}
          suffix="%"
          onChange={setMortgageRatePercent}
        />
        <InputSlider
          label="Срок ипотеки"
          hint="На сколько лет оформляется кредит. Влияет на размер ежемесячного платежа."
          value={mortgageYears}
          min={1}
          max={30}
          step={1}
          suffix="лет"
          onChange={setMortgageYears}
        />
      </CalculatorSection>

      <CalculatorSection title="Аренда и горизонт" description="Сценарий, если продолжаете снимать жильё.">
        <InputSlider
          label="Горизонт сравнения"
          hint="На сколько лет вперёд сравниваем покупку и аренду. Часто берут 5, 10 или 15 лет."
          value={comparisonYears}
          min={1}
          max={30}
          step={1}
          suffix="лет"
          onChange={setComparisonYears}
        />
        <NumberField
          label="Аренда в месяц ₽"
          hint="Сколько стоит снять похожую квартиру сейчас."
          value={monthlyRent}
          min={0}
          step={1000}
          onChange={setMonthlyRent}
          helperText={
            priceToRent !== null
              ? `P/R = ${percentFormat(priceToRent)} (до 15 — покупка, выше 20 — аренда)`
              : undefined
          }
        />
        <InputSlider
          label="Рост аренды"
          hint="На сколько в среднем в год может дорожать аренда. Ориентир — инфляция или рынок вашего города."
          value={rentIncreasePercent}
          min={0}
          max={15}
          step={0.1}
          suffix="%"
          onChange={setRentIncreasePercent}
        />
      </CalculatorSection>

      <CalculatorSection title="Допущения рынка">
        <InputSlider
          label="Рост цены жилья"
          hint="Ожидаемый средний рост стоимости недвижимости в год. Не гарантия, а допущение для модели."
          value={homeAppreciationPercent}
          min={0}
          max={15}
          step={0.1}
          suffix="%"
          onChange={setHomeAppreciationPercent}
        />
        <InputSlider
          label="Расходы на содержание"
          hint="Ремонт, коммунальные сверх базовых, налоги и прочее в % от стоимости жилья в год."
          value={maintenancePercent}
          min={0}
          max={5}
          step={0.1}
          suffix="% в год"
          onChange={setMaintenancePercent}
        />
        <InputSlider
          label="Доходность инвестиций (арендатор)"
          hint="Если снимаете, взнос и разница в платежах могут идти в портфель. Укажите ожидаемую доходность."
          value={investmentReturnPercent}
          min={0}
          max={20}
          step={0.1}
          suffix="%"
          onChange={setInvestmentReturnPercent}
        />
      </CalculatorSection>

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Выгоднее"
            hint="Какой сценарий даёт больший чистый капитал к концу выбранного горизонта."
            value={winnerLabel(result.winner)}
            highlight
          />
          <ResultCard
            label="Разница в капитале"
            hint="Насколько один сценарий опережает другой в рублях."
            value={moneyFormat(Math.abs(result.wealthDifference))}
            subtitle={
              result.wealthDifference >= 0
                ? "в пользу покупки к концу периода"
                : "в пользу аренды к концу периода"
            }
          />
          <ResultCard
            label="Платёж по ипотеке"
            hint="Фиксированный ежемесячный платёж по аннуитетной схеме при заданной ставке и сроке."
            value={moneyFormat(result.monthlyMortgagePayment)}
          />
          <ResultCard
            label="Точка безубыточности"
            hint="Год, когда капитал покупателя догоняет капитал арендатора при заданных вводных."
            value={breakEvenText}
          />
          <ResultCard label="Итого аренда" hint="Сумма всех арендных платежей за период." value={moneyFormat(result.totalRentPaid)} />
          <ResultCard
            label="Капитал покупателя"
            hint="Доля в жилье: стоимость минус остаток ипотеки."
            value={moneyFormat(result.buyerNetWorth)}
          />
          <ResultCard
            label="Капитал арендатора"
            hint="Инвестиционный портфель при сценарии «снимать и инвестировать»."
            value={moneyFormat(result.renterNetWorth)}
          />
          <ResultCard
            label="Стоимость жилья"
            hint="Прогнозная цена квартиры через выбранный срок."
            value={moneyFormat(result.homeValueAtEnd)}
            subtitle="через выбранный срок"
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
        <h2 className="mb-3 text-xl font-medium">Капитал: покупка vs аренда</h2>
        <p className="mb-3 text-sm text-text-muted">
          Сравнение чистого капитала: доля в жилье у покупателя и портфель у арендатора.
        </p>
        <RentVsBuyChart data={chartData} />
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
                  <th className="border-b border-border px-3 py-2">Покупка</th>
                  <th className="border-b border-border px-3 py-2">Аренда</th>
                  <th className="border-b border-border px-3 py-2">Вложено (аренда)</th>
                  <th className="border-b border-border px-3 py-2">Вложено (покупка)</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.year}>
                    <td className="border-b border-border px-3 py-2">{row.year}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.buyerNetWorth)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.renterNetWorth)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.rentPaidCumulative)}</td>
                    <td className="border-b border-border px-3 py-2 font-mono">{moneyFormat(row.buyPaidCumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Как читать результат</h2>
        <p>
          Подробный разбор — в статье{" "}
          <Link href="/blog/arenda-vs-ipoteka" className="underline">
            «Аренда или ипотека — что выгоднее»
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
