import { BASE_URL, deleteShortUrl } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUrls } from "../../hooks/useUrls";
import { Button } from "../components/ui/button";

const UrlList = () => {
  const { data: urls, isLoading } = useUrls();
  const queryClient = useQueryClient();
  const { mutate: deleteUrl } = useMutation({
    mutationFn: deleteShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Shortened URLs</h2>
      <ul className="space-y-4">
        {urls?.map((url: { shortUrl: string; originalUrl: string }) => (
          <li
            key={url.shortUrl}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>
                Original:{" "}
                <a href={url.originalUrl} target="_blank" className="text-blue-500">
                  {url.originalUrl}
                </a>
              </p>
              <p>
                Short:{" "}
                <a href={`${BASE_URL}/${url.shortUrl}`} target="_blank" className="text-blue-500">
                  {url.shortUrl}
                </a>
              </p>
            </div>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => deleteUrl(url.shortUrl)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
