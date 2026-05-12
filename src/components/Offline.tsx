const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-5">
      <h1>🔌 Offline Mode</h1>
      <p>Please check your internet connection.</p>
      <p>Some features are still available offline.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-5 px-2.5 py-4 cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};

export default Offline;
