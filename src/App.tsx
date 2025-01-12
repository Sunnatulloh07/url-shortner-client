import UrlForm from './components/shared/UrlForm';
import UrlList from './components/shared/UrlList';
import UrlAnalytics from './components/shared/UrlAnalytics';

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto w-[50%] flex flex-col py-10">
        <h1 className="text-3xl font-bold text-center mb-8">URL Shortener</h1>
        <UrlForm />
        <UrlList />
        <UrlAnalytics />
      </div>
    </div>
  );
}

export default App;
