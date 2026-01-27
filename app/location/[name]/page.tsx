import { capitalize } from "@/app/_components/capitalize_";
import { StaticList } from "@/app/_components/list_";
import { fetchLocationInfo } from "@/utils/pokeapi";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Location({ params }: PageProps) {
  const location = await fetchLocationInfo((await params).name);
  console.log(location);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {capitalize(location.name, "location")}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Region: {capitalize(location.region, "location")}
          </h2>
        </section>
        <section>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            TEST
            {location.areas.map((area) => (
              <li
                key={area.name}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="text-xl font-semibold">
                  {capitalize(area.name, "location")}
                </h3>
                <StaticList list={{
                  root: "pokemon",
                  results: area.encounters
                  }} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}