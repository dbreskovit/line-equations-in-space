import { useState, useEffect, FormEvent } from 'react';
import Input from './Input';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface LineEquationFormProps {
  onFormSubmit: (P0: Vector3, V: Vector3, P: Vector3) => void;
}

const defaultValues = {
  P0: { x: 1, y: 2, z: 3 },
  V: { x: 1, y: 0, z: 0 },
  P: { x: 2, y: 2, z: 3 }
};

function LineEquationForm({ onFormSubmit }: LineEquationFormProps) {
  const [P0, setP0] = useState(defaultValues.P0);
  const [V, setV] = useState(defaultValues.V);
  const [P, setP] = useState(defaultValues.P);
  const [result, setResult] = useState<string>('');

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const validateVector = (vector: Vector3) =>
      !isNaN(vector.x) && !isNaN(vector.y) && !isNaN(vector.z);

    if (validateVector(P0) && validateVector(V) && validateVector(P)) {
      const isPointOnLine = (P0: Vector3, V: Vector3, P: Vector3): boolean => {
        const epsilon = 1e-6;
        if (V.x === 0 && V.y === 0 && V.z === 0) return false;


        if (P0.x === P.x && P0.y === P.y && P0.z === P.z) return true;

        if (V.x === 0 && P.x !== P0.x) return false;
        if (V.y === 0 && P.y !== P0.y) return false;
        if (V.z === 0 && P.z !== P0.z) return false;

        const tX = V.x !== 0 ? (P.x - P0.x) / V.x : NaN;
        const tY = V.y !== 0 ? (P.y - P0.y) / V.y : NaN;
        const tZ = V.z !== 0 ? (P.z - P0.z) / V.z : NaN;

        return (
          (isNaN(tX) || isNaN(tY) || Math.abs(tX - tY) < epsilon) &&
          (isNaN(tY) || isNaN(tZ) || Math.abs(tY - tZ) < epsilon) &&
          (isNaN(tX) || isNaN(tZ) || Math.abs(tX - tZ) < epsilon)
        );
      };

      if (isPointOnLine(P0, V, P)) {
        setResult('O ponto está na linha.');
      } else {
        setResult('O ponto não está na linha.');
      }

      onFormSubmit(P0, V, P);
    } else {
      setResult('Os valores devem ser números válidos.');
    }
  };


  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-slate-950 border border-slate-900 rounded-lg shadow-lg w-full max-w-md p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">Equação paramétrica da reta</h1>

        {/* Ponto Inicial */}
        <div className="flex flex-col space-y-2">
          <label className="text-white font-semibold">Ponto Inicial:</label>
          <div className="flex flex-wrap gap-2">
            <Input
              type="number"
              placeholder="x"
              value={P0.x}
              onChange={(x) => setP0({ ...P0, x })}
            />
            <Input
              type="number"
              placeholder="y"
              value={P0.y}
              onChange={(y) => setP0({ ...P0, y })}
            />
            <Input
              type="number"
              placeholder="z"
              value={P0.z}
              onChange={(z) => setP0({ ...P0, z })}
            />
          </div>
        </div>

        {/* Vetor Diretor */}
        <div className="flex flex-col space-y-2">
          <label className="text-white font-semibold">Vetor Diretor:</label>
          <div className="flex flex-wrap gap-2">
            <Input
              type="number"
              placeholder="x"
              value={V.x}
              onChange={(x) => setV({ ...V, x })}
            />
            <Input
              type="number"
              placeholder="y"
              value={V.y}
              onChange={(y) => setV({ ...V, y })}
            />
            <Input
              type="number"
              placeholder="z"
              value={V.z}
              onChange={(z) => setV({ ...V, z })}
            />
          </div>
        </div>

        {/* Ponto */}
        <div className="flex flex-col space-y-2">
          <label className="text-white font-semibold">Ponto:</label>
          <div className="flex flex-wrap gap-2">
            <Input
              type="number"
              placeholder="x"
              value={P.x}
              onChange={(x) => setP({ ...P, x })}
            />
            <Input
              type="number"
              placeholder="y"
              value={P.y}
              onChange={(y) => setP({ ...P, y })}
            />
            <Input
              type="number"
              placeholder="z"
              value={P.z}
              onChange={(z) => setP({ ...P, z })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition-colors duration-300 w-full"
        >
          Verificar
        </button>
        <label className={`font-bold text-lg ${result.includes('não') ? 'text-red-500' : 'text-green-500'} text-center`}>
          {result}
        </label>
      </form>
    </div>
  );
}

export default LineEquationForm;
