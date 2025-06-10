import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to RemWaste</h1>
        <p className="text-gray-600">Skip hire service application</p>
      </main>
    </div>
  );
}

export default App;
