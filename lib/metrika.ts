/** ID счётчика Яндекс.Метрики (https://metrika.yandex.ru/). */
export const YANDEX_METRIKA_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? "109655149");

export function isYandexMetrikaEnabled(): boolean {
  return Number.isFinite(YANDEX_METRIKA_ID) && YANDEX_METRIKA_ID > 0;
}
