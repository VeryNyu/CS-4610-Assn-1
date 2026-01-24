import Link from "next/link";
import {fetchPokemon} from "@/utils/pokeapi";

export default async function PokemonPage() {

  const pokemon = await fetchPokemon();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          Pokemon index page
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          This page will display a searchable list of Pokemon
        </p>
        <section className="mt-10 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Pokemon
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5">
            {pokemon.results.map((pokemon) => (
                <li
                key={pokemon.name}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                <Link href={`/pokemon/${pokemon.name}`} className="hover:underline">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}