import React, { useState } from 'react';
import { Grip } from 'lucide-react';
import Header from './Header';
import CommunityPanel from './CommunityPanel';
import BattlePanel from './BattlePanel';
import BattleInterface from './BattleInterface';
import type { Battle } from '../types';

const Dashboard: React.FC = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(40); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [activeBattle, setActiveBattle] = useState<Battle | null>(null);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const containerWidth = window.innerWidth;
    const newWidth = (e.clientX / containerWidth) * 100;
    
    if (newWidth >= 20 && newWidth <= 70) {
      setLeftPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleJoinBattle = (battle: Battle) => {
    setActiveBattle(battle);
  };

  const handleBackToDashboard = () => {
    setActiveBattle(null);
  };

  if (activeBattle) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <BattleInterface battle={activeBattle} onBack={handleBackToDashboard} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex relative">
        {/* Left Panel - Communities */}
        <div 
          className={`${leftPanelCollapsed ? 'w-0' : ''} transition-all duration-300 border-r border-gray-200`}
          style={{ 
            width: leftPanelCollapsed ? '0%' : `${leftPanelWidth}%`,
            minWidth: leftPanelCollapsed ? '0px' : '300px'
          }}
        >
          <div className={`h-full overflow-hidden ${leftPanelCollapsed ? 'hidden' : ''}`}>
            <CommunityPanel />
          </div>
        </div>

        {/* Resize Handle */}
        {!leftPanelCollapsed && !rightPanelCollapsed && (
          <div
            className="w-1 bg-gray-200 hover:bg-reddit-orange cursor-col-resize relative group transition-colors"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 bg-reddit-orange p-1 rounded transition-opacity">
                <Grip className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Battles */}
        <div 
          className={`${rightPanelCollapsed ? 'w-0' : 'flex-1'} transition-all duration-300`}
          style={{ 
            width: rightPanelCollapsed ? '0%' : leftPanelCollapsed ? '100%' : `${100 - leftPanelWidth}%`,
            minWidth: rightPanelCollapsed ? '0px' : '400px'
          }}
        >
          <div className={`h-full overflow-hidden ${rightPanelCollapsed ? 'hidden' : ''}`}>
            <BattlePanel onJoinBattle={handleJoinBattle} />
          </div>
        </div>

        {/* Panel Toggle Buttons */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          <button
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="bg-white shadow-md border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            title={leftPanelCollapsed ? 'Show Communities' : 'Hide Communities'}
          >
            <span className="text-sm font-medium text-gray-700">
              {leftPanelCollapsed ? '▶' : '◀'} Communities
            </span>
          </button>
          <button
            onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
            className="bg-white shadow-md border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            title={rightPanelCollapsed ? 'Show Battles' : 'Hide Battles'}
          >
            <span className="text-sm font-medium text-gray-700">
              Battles {rightPanelCollapsed ? '◀' : '▶'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile View Notice */}
      <div className="md:hidden bg-yellow-50 border-t border-yellow-200 p-4">
        <p className="text-sm text-yellow-800 text-center">
          For the best experience, use Roast Battle Arena on a desktop or tablet
        </p>
      </div>
    </div>
  );
};

export default Dashboard;