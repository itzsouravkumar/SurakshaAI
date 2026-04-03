import React from 'react';

export function BackgroundMesh() {
  return (
    <div className="bg-mesh">
      <div 
        className="bg-blob bg-indigo-200 w-[500px] h-[500px] top-[-10%] left-[-10%]"
      />
      <div 
        className="bg-blob bg-purple-200 w-[600px] h-[600px] top-[20%] right-[-10%]" 
        style={{ animationDelay: '-5s' }}
      />
      <div 
        className="bg-blob bg-blue-200 w-[400px] h-[400px] bottom-[-10%] left-[20%]" 
        style={{ animationDelay: '-10s' }}
      />
      <div 
        className="bg-blob bg-teal-100 w-[500px] h-[500px] bottom-[10%] right-[10%]" 
        style={{ animationDelay: '-15s' }}
      />
    </div>
  );
}
