import { useQuery } from "react-query";
import { getStatsSummary } from "../services/UrbitLive.service";

const ONE_HOUR = 5 * 60 * 1000;

export default function useUrbitStatsSummary() {
  return useQuery("useUrbitStatsSummary", getStatsSummary, { cacheTime: ONE_HOUR });
}
