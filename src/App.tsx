import { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Player } from './components/Player';

function App() {
  const [currentView, setCurrentView] = useState('all-songs');

  return (
    <MusicProvider>
      <div className="flex h-screen bg-gray-900 overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContent currentView={currentView} />
          <Player />
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;
