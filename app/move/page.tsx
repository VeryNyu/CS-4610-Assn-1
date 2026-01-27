import {fetchList} from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";

export default async function movePage() {

    const moves = await fetchList("move");

    return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            Move index page
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            This page will display a searchable list of Pokemon moves
        </p>
        <section className="mt-10 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Moves
            </h2>
            <SearchableList list = {moves} />
            </section>
        </main>
    </div>
    );
}