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
        <section className="mt-10 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Moves
          </h2>
        </section>
          {console.log("API Call: ")}
          {console.log(pokemon)}
          {console.log("ID: ")}
          {console.log(pokemon.id)}
          {console.log("Name: ")}
          {console.log(pokemon.name)}
          {console.log("Abilities: ")}
          {console.log(pokemon.abilities)}
          {console.log("Location: ")}
          {console.log(pokemon.locationURL)}
          {console.log("Moves: ")}
          {console.log(pokemon.moves)}
          {console.log("Stats: ")}
          {console.log(pokemon.stats)}
      </main>
    </div>
  );
}