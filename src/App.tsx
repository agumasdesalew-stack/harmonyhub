import { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Player } from './components/Player';
import { RightSidebar } from './components/RightSidebar';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState('browse');

  return (
    <MusicProvider>
      <div className="flex flex-col h-screen bg-transparent overflow-hidden">
        <Header setCurrentView={setCurrentView} />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <MainContent currentView={currentView} setCurrentView={setCurrentView} />
            <Player />
          </div>
          <RightSidebar />
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;
