import { DateTime } from 'luxon';

interface DailySalesStats {
  date: string, // 11/18
  priceEth: number,
  priceUsd: number,
  priceBtc: number,
  txHashes: string[], // empty if no sales
  points: number[],
}

interface StatsResponse {
  sales: DailySalesStats[],
  count: number,
  volumeEth: number,
  volumeUsd: number,
  volumeBtc: number,
}

const from = (fromDate?: string) => {
  const oneMonthAgo = DateTime.now().minus({ days: 30 });
  return fromDate || oneMonthAgo.toFormat('dd-LL-yyyy');
}

const to = (toDate?: string) => {
  const today = DateTime.now();
  return toDate || today.toFormat('dd-LL-yyyy');
}

export const getStats =
  async ({ topic, fromDate, toDate }: { topic: number, fromDate: string, toDate: string }): Promise<StatsResponse> => {
  const response = await fetch(`https://api.urbit.live/stats?topic=${topic}&fromDate=${fromDate}&toDate=${toDate}`);

  if(!response.ok) {
    throw new Error(`Stats call failed: topic: ${topic}`);
  }
  return await response.json();
}

export const getStarStats =
async ({ fromDate, toDate }: { fromDate?: string, toDate?: string }): Promise<StatsResponse> => {
  const STAR_TOPIC = 1;
  return await getStats({ topic: STAR_TOPIC, fromDate: from(fromDate), toDate: to(toDate) });
}

export const getPlanetStats =
async ({ fromDate, toDate }: { fromDate?: string, toDate?: string }): Promise<StatsResponse> => {
  const PLANET_TOPIC = 0;
  return await getStats({ topic: PLANET_TOPIC, fromDate: from(fromDate), toDate: to(toDate) });
}

interface StatsSummaryResponse {
  salesStatsSummary: {
    spanMs: number,
    planets: {
      recent: {
        volumeEth: number,
        volumeUsd: number,
        volumeBtc: number,
        txCount: number
      },
      prior: {
        volumeEth: number,
        volumeUsd: number,
        volumeBtc: number,
        txCount: number
      }
    },
    stars: {
      recent: {
        volumeEth: number,
        volumeUsd: number,
        volumeBtc: number,
        txCount: number
      },
      prior: {
        volumeEth: number,
        volumeUsd: number,
        volumeBtc: number,
        txCount: number
      }
    }
  }
}

export const getStatsSummary = async (): Promise<StatsSummaryResponse> => {
  const response = await fetch("https://api.urbit.live/statsSummary");

  if(!response.ok) {
    throw new Error(`Stats summary call failed`);
  }
  return await response.json();
}
