import { useQuery } from '@tanstack/react-query';
import { fetchUrls } from '../services/api';

export function useUrls() {
  return useQuery({ queryKey: ['shortUrls'], queryFn: fetchUrls });
}
