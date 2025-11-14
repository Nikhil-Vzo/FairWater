export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-100 border-b border-blue-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          FairWater – Raipur Water Distribution Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Online</span>
        </div>
      </div>
    </header>
  );
};
