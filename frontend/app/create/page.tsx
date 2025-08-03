'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateLoop() {
  const [token, setToken] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Simulate async contract call
    setTimeout(() => {
      setLoading(false);
      setMessage('Loop créée!');
      // redirect to example loop page
      router.push('/loop/demo');
    }, 1000);
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Créer une loop</h1>
      <form onSubmit={submit} className="space-y-2 max-w-md">
        <input
          className="w-full border p-2"
          placeholder="Adresse du token (0x0 pour ETH)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          className="w-full border p-2"
          placeholder="Adresse du bénéficiaire"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Création...' : 'Créer'}
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </main>
  );
}

