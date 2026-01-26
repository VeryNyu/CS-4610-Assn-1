import { SearchableList } from "@/app/_components/searchable_list_";
import { fetchGenerationInfo } from "@/utils/pokeapi";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Generation({ params }: PageProps) {
  const generation = await fetchGenerationInfo((await params).name);
  const { name } = await params;
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {generation.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </h1>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {generation.region.charAt(0).toUpperCase() + generation.region.slice(1)}
          </h2>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Pokemon
          </h2>
          <SearchableList list = {generation}/>
        </section>
      </main>
    </div>
  );
}