import InstallPrompt from "./components/InstallPrompt";
import Offline from "./components/Offline";
import useOnlineStatus from "./hooks/useOnlineStatus";

function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="App">
      {/* Online status banner */}
      {!isOnline && (
        <div className="fixed top-0 bg-red-500 text-white p-2.5 text-center z-1000">
          ⚠️ You are currently offline
        </div>
      )}

      {/* Show Offline component when offline */}
      {!isOnline ? (
        <Offline />
      ) : (
        <>
          <h1 className="text-green-forest-70 text-3xl font-bold">
            My First PWA
          </h1>
          <p>You're online! All features are available.</p>
          {/* Add the rest of your app content here */}
        </>
      )}
      <InstallPrompt />
    </div>
  );
}

export default App;
