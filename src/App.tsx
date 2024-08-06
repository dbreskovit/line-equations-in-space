import React, { useState } from 'react';
import LineEquationForm from './components/LineEquationForm';
import ThreeCanvas from './components/ThreeScene';

const App: React.FC = () => {
  const [P0, setP0] = useState<{ x: number, y: number, z: number } | null>(null);
  const [V, setV] = useState<{ x: number, y: number, z: number } | null>(null);
  const [P, setP] = useState<{ x: number, y: number, z: number } | null>(null);

  const handleFormSubmit = (P0: { x: number, y: number, z: number }, V: { x: number, y: number, z: number }, P: { x: number, y: number, z: number }) => {
    setP0(P0);
    setV(V);
    setP(P);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-900 text-white">
      <div className="flex-none w-1/3 p-4 bg-gray-800">
        <LineEquationForm onFormSubmit={handleFormSubmit} />
      </div>
      <div className="flex-1 p-4">
        {P0 && V && P && <ThreeCanvas P0={P0} V={V} P={P} />}
      </div>
    </div>
  );
}

export default App;
