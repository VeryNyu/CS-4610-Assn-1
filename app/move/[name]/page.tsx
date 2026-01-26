import { SearchableList } from "@/app/_components/searchable_list_";
import { fetchMoveInfo } from "@/utils/pokeapi";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Moves({ params }: PageProps) {
  const moves = await fetchMoveInfo((await params).name);
  const { name } = await params;
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            Move Name: {name}
          </h1>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Stats for {name}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li
              className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                Accuracy: {moves.accuracy}
            </li>
            <li
              className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                Power: {moves.power}
            </li>
            <li
              className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                PP: {moves.pp}
            </li>
          </ul> 
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Flavor Text
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {moves.flavorText.map((entry, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  "{entry.flavorText.replace(/\n/g, " ")}"<br/><br/> - {entry.game.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Learned By Pokemon
          </h2>
          <SearchableList list={moves} />
        </section>
      </main>
    </div>
  );
}