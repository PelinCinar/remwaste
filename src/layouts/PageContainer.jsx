const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-slate-900 text-white ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
