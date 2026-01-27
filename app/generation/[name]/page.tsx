import { fetchGenerationInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/capitalize_";
import { SearchableList } from "@/app/_components/list_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Generation({ params }: PageProps) {
  const generation = await fetchGenerationInfo((await params).name);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {capitalize(generation.name, "generation")}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {capitalize(generation.region, "region")}
          </h2>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Pokemon
          </h2>
          <SearchableList list = {generation.results}/>
        </section>
      </main>
    </div>
  );
}