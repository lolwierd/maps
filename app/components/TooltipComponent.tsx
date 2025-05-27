import React from 'react';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: React.ReactNode;
}

const TooltipComponent: React.FC<TooltipProps> = ({ visible, x, y, content }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        left: x + 10, // Offset to prevent tooltip from being directly under cursor
        top: y + 10,  // Offset for the same reason
        position: 'absolute',
        pointerEvents: 'none', // Allows map events to pass through
        zIndex: 50, // Ensures tooltip is above other elements
      }}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded shadow-lg text-sm"
    >
      {content}
    </div>
  );
};

export default TooltipComponent;
