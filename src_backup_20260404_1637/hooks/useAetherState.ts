import { useQuery } from '@tanstack/react-query';
import { fetchState } from '../api/client';

const REFRESH_INTERVAL = 5000; // 5 seconds (faster than the old 15s)

export function useAetherState() {
  const query = useQuery({
    queryKey: ['aether-state'],
    queryFn: fetchState,
    refetchInterval: REFRESH_INTERVAL,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    state: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    lastUpdate: query.dataUpdatedAt,
  };
}
