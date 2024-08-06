import React, { useState, FormEvent } from 'react';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface LineEquationFormProps {
  onFormSubmit: (P0: Vector3, V: Vector3, P: Vector3) => void;
}

const defaultValues = {
  P0: '1,2,3',
  V: '1,0,0',
  P: '0,1,0'
};

function LineEquationForm({ onFormSubmit }: LineEquationFormProps) {
  const [P0, setP0] = useState<string>(defaultValues.P0);
  const [V, setV] = useState<string>(defaultValues.V);
  const [P, setP] = useState<string>(defaultValues.P);
  const [result, setResult] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const P0Arr = P0.split(',').map(Number);
    const VArr = V.split(',').map(Number);
    const PArr = P.split(',').map(Number);

    if (P0Arr.length === 3 && VArr.length === 3 && PArr.length === 3) {
      const P0Vector = { x: P0Arr[0], y: P0Arr[1], z: P0Arr[2] };
      const VVector = { x: VArr[0], y: VArr[1], z: VArr[2] };
      const PVector = { x: PArr[0], y: PArr[1], z: PArr[2] };

      // Call the prop function to pass the vectors
      onFormSubmit(P0Vector, VVector, PVector);
    } else {
      setResult('Os valores devem ser números válidos separados por vírgulas.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-black border border-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Equação paramétrica da reta</h1>
      <input
        type="text"
        placeholder="Ponto inicial (x,y,z)"
        value={P0}
        onChange={(e) => setP0(e.target.value)}
        className="border rounded-lg py-2 px-3 bg-gray-800 border-indigo-600 placeholder-white text-white"
      />
      <input
        type="text"
        placeholder="Vetor diretor (x,y,z)"
        value={V}
        onChange={(e) => setV(e.target.value)}
        className="border rounded-lg py-2 px-3 bg-gray-800 border-indigo-600 placeholder-white text-white"
      />
      <input
        type="text"
        placeholder="Ponto (x,y,z)"
        value={P}
        onChange={(e) => setP(e.target.value)}
        className="border rounded-lg py-2 px-3 bg-gray-800 border-indigo-600 placeholder-white text-white"
      />
      <button type="submit" className="border border-indigo-600 bg-black text-white rounded-lg py-2 font-semibold">
        Verificar
      </button>
      <label className={`font-bold text-lg ${result.includes('não') ? 'text-red-600' : 'text-green-600'}`}>
        {result}
      </label>
    </form>
  );
}

export default LineEquationForm;
