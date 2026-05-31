"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import InputSlider from "@/components/InputSlider";
import RentVsBuyChart from "@/components/RentVsBuyChart";
import ResultCard from "@/components/ResultCard";
import { calculateRentVsBuy } from "@/lib/calculations";

const moneyFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const winnerLabel = (winner: "buy" | "rent" | "tie") => {
  if (winner === "buy") return "Покупка";
  if (winner === "rent") return "Аренда";
  return "Примерно одинаково";
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

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(8000000);
  const [downPayment, setDownPayment] = useState(1600000);
  const [mortgageRatePercent, setMortgageRatePercent] = useState(16);
  const [mortgageYears, setMortgageYears] = useState(20);
  const [comparisonYears, setComparisonYears] = useState(10);
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [rentIncreasePercent, setRentIncreasePercent] = useState(5);
  const [homeAppreciationPercent, setHomeAppreciationPercent] = useState(3);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(10);
  const [showTable, setShowTable] = useState(false);

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
    result.breakEvenYear === null
      ? "Не наступает за период"
      : `${result.breakEvenYear} год`;

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
          <NumberField
            label="Стоимость жилья ₽"
            value={homePrice}
            min={0}
            step={100000}
            onChange={setHomePrice}
          />
          <NumberField
            label="Первоначальный взнос ₽"
            value={downPayment}
            min={0}
            step={50000}
            onChange={setDownPayment}
          />
          <InputSlider
            label="Ставка ипотеки"
            value={mortgageRatePercent}
            min={1}
            max={25}
            step={0.1}
            suffix="%"
            onChange={setMortgageRatePercent}
          />
          <InputSlider
            label="Срок ипотеки"
            value={mortgageYears}
            min={1}
            max={30}
            step={1}
            suffix="лет"
            onChange={setMortgageYears}
          />
          <InputSlider
            label="Горизонт сравнения"
            value={comparisonYears}
            min={1}
            max={30}
            step={1}
            suffix="лет"
            onChange={setComparisonYears}
          />
          <NumberField
            label="Аренда в месяц ₽"
            value={monthlyRent}
            min={0}
            step={1000}
            onChange={setMonthlyRent}
          />
          <InputSlider
            label="Рост аренды"
            value={rentIncreasePercent}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            onChange={setRentIncreasePercent}
          />
          <InputSlider
            label="Рост цены жилья"
            value={homeAppreciationPercent}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            onChange={setHomeAppreciationPercent}
          />
          <InputSlider
            label="Расходы на содержание"
            value={maintenancePercent}
            min={0}
            max={5}
            step={0.1}
            suffix="% в год"
            onChange={setMaintenancePercent}
          />
          <InputSlider
            label="Доходность инвестиций (арендатор)"
            value={investmentReturnPercent}
            min={0}
            max={20}
            step={0.1}
            suffix="%"
            onChange={setInvestmentReturnPercent}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium">Результаты</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="Выгоднее" value={winnerLabel(result.winner)} highlight />
          <ResultCard
            label="Разница в капитале"
            value={moneyFormat(Math.abs(result.wealthDifference))}
            subtitle={
              result.wealthDifference >= 0
                ? "в пользу покупки к концу периода"
                : "в пользу аренды к концу периода"
            }
          />
          <ResultCard label="Платёж по ипотеке" value={moneyFormat(result.monthlyMortgagePayment)} />
          <ResultCard label="Точка безубыточности" value={breakEvenText} />
          <ResultCard label="Итого аренда" value={moneyFormat(result.totalRentPaid)} />
          <ResultCard label="Капитал покупателя" value={moneyFormat(result.buyerNetWorth)} />
          <ResultCard label="Капитал арендатора" value={moneyFormat(result.renterNetWorth)} />
          <ResultCard label="Стоимость жилья" value={moneyFormat(result.homeValueAtEnd)} subtitle="через выбранный срок" />
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
          Сравнение чистого капитала: доля в жилье у покупателя и инвестиционный портфель у арендатора (взнос + разница
          в платежах).
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
          Калькулятор сравнивает два сценария на одном горизонте: вы покупаете жильё в ипотеку или снимаете и
          инвестируете первоначальный взнос плюс разницу в ежемесячных расходах. У покупателя капитал — это доля в
          квартире (цена минус остаток долга), у арендатора — портфель на бирже.
        </p>
        <p>
          В России на результат сильно влияют ставка ипотеки, темп роста аренды и ожидаемая доходность альтернативных
          вложений. При высокой ставке по кредиту аренда с инвестированием взноса часто выглядит выгоднее на горизонте
          5–10 лет.
        </p>
        <p>
          Расходы на ремонт и содержание учтены как доля от стоимости жилья в год. Это упрощение: в реальности будут
          разовые траты и налоги — используйте калькулятор для ориентира, а не как точный финансовый план.
        </p>
        <p>
          Для расчёта накоплений без жилья попробуйте{" "}
          <Link href="/compound-interest" className="underline">
            калькулятор сложного процента
          </Link>{" "}
          или{" "}
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

      <div
        id="ad-bottom"
        className="min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted"
      >
        Рекламный блок
      </div>
    </div>
  );
}
