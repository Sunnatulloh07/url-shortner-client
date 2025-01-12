import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUrlAnalytics } from '../../services/api';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

function UrlAnalytics() {
  const [shortUrl, setShortUrl] = useState('');
  const { data, refetch } = useQuery({
    queryKey: ['analytics', shortUrl],
    queryFn: () => getUrlAnalytics(shortUrl),
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">URL Analytics</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter Short URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Get Analytics
        </Button>
      </form>
      {data && (
        <div className="mt-4">
          <p>Clicks: {data.clickCount}</p>
          <ul>
            {data.recentClicks.map((click: { date: string; ip: string }, idx: number) => (
              <li key={idx}>{click.date} - {click.ip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UrlAnalytics;
