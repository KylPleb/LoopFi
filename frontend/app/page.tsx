import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">LoopFi</h1>
      <div className="space-x-4">
        <Link href="/create" className="text-blue-600 underline">
          Créer une loop
        </Link>
        <Link href="/loop/demo" className="text-blue-600 underline">
          Exemple de loop
        </Link>
      </div>
    </main>
  );
}
