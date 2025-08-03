'use client';

import { useState } from 'react';

interface PageProps {
  params: { id: string };
}

export default function LoopPage({ params }: PageProps) {
  const [capital, setCapital] = useState(0);
  const [amount, setAmount] = useState('');
  const [roleJoined, setRoleJoined] = useState(false);
  const [roleCompleted, setRoleCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const isAdmin = true; // Demo purpose

  const notify = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const joinRole = () => {
    if (roleJoined) return;
    if (confirm('Mint NFT pour ce rôle ?')) {
      setRoleJoined(true);
      notify('Rôle rejoint');
    }
  };

  const stake = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    if (confirm(`Staker ${val} USDC ?`)) {
      setCapital((c) => c + val);
      setAmount('');
      notify('USDC staké');
    }
  };

  const complete = () => {
    if (confirm('Marquer comme complété ?')) {
      setRoleCompleted(true);
      notify('Rôle complété');
    }
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Loop {params.id}</h1>
      <div>
        <p>Capital collecté: {capital} USDC</p>
        <p>Statut: {roleCompleted ? 'Terminé' : 'En cours'}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={joinRole}
          disabled={roleJoined}
          className="bg-green-600 text-white px-4 py-2"
        >
          {roleJoined ? 'Rôle rejoint' : 'Rejoindre un rôle'}
        </button>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant"
          className="border p-2 w-24"
        />
        <button
          onClick={stake}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Capitaliser
        </button>
      </div>
      {isAdmin && !roleCompleted && (
        <button
          onClick={complete}
          className="bg-purple-600 text-white px-4 py-2"
        >
          Marquer complété
        </button>
      )}
      {message && <p className="text-green-600">{message}</p>}
    </main>
  );
}

