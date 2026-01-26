import { fetchPokemonInfo } from "@/utils/pokeapi";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const pokemon = await fetchPokemonInfo((await params).name);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          This page displays content for the pokemon with name: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Locations
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pokemon.locations.map((location, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <Link href={`/location/${location.name}`} className="hover:underline">
                    {location.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Moves
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pokemon.moves.map((move, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <Link href={`/move/${move.name}`} className="hover:underline">
                    {move.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}