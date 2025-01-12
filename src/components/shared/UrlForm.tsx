import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShortUrl } from '../../services/api';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const UrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [method, setMethod] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortUrls'] });
      setOriginalUrl('');
      setAlias('');
      setMethod('');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('Error:', (error as any).response?.data || error.message);
      } else {
        console.error('Error:', error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ originalUrl, alias, method });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="input input-bordered"
        required
      />
        <Input
        type="text"
        placeholder="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="input input-bordered"
        />
      </div>
        <Input
          type="text"
          placeholder="Custom Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        className="input input-bordered"
        />
      <Button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Shortening...' : 'Shorten'}
      </Button>
      {mutation.isError && (
        <p className="text-red-500">Xatolik: {(mutation.error as any).message}</p>
      )}
    </form>
  );
};

export default UrlForm;
