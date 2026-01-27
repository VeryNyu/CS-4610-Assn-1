import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";

export default async function PokemonPage() {
  const pokemon = await fetchList("pokemon");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          Pokemon
        </h1>
          <SearchableList list = {pokemon}/>
        </section>
      </main>
    </div>
  );
}