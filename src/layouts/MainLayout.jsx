import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
