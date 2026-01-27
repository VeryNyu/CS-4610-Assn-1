import { fetchPokemonInfo } from "@/utils/pokeapi";
import { StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/capitalize_";

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
          {capitalize(pokemon.name, "pokemon")}
        </h1>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sprites
          </h2>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Stats
          </h2>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Locations
          </h2>
          <StaticList list={{
            root: "location",
            results: pokemon.locations
            }} />
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Moves
          </h2>
          <StaticList list={{
            root: "move",
            results: pokemon.moveList
            }} />
        </section>
      </main>
    </div>
  );
}