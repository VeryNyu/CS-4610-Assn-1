import { fetchLocationInfo } from "@/utils/pokeapi";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Location({ params }: PageProps) {
  const location = await fetchLocationInfo((await params).name);
  const areas = location.areas;
  console.log(location);
  console.log(areas);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="mt-10 w-full">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {/* Location Name: {location.name.charAt(0).toUpperCase() + location.name.slice(1)} */}
            Location Name: {location.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </h1>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Region: {location.region.charAt(0).toUpperCase() + location.region.slice(1)}
          </h2>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Location Areas
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {areas.map((area, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {area.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  <section>
                    <ul>
                      {area.encounters.map((encounter, idx) => (
                        <li key={idx}>
                          <Link href={`../pokemon/${encounter.name}`} className="hover:underline">
                            {encounter.name.charAt(0).toUpperCase() + encounter.name.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}