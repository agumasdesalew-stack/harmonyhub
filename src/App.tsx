import { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Player } from './components/Player';
import { RightSidebar } from './components/RightSidebar';

function App() {
  const [currentView, setCurrentView] = useState('browse');

  return (
    <MusicProvider>
      <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContent currentView={currentView} />
          <Player />
        </div>
        <RightSidebar />
      </div>
    </MusicProvider>
  );
}

export default App;
