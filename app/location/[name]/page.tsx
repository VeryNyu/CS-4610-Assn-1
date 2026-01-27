import { fetchLocationInfo } from "@/utils/pokeapi";
import { StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/capitalize_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Location({ params }: PageProps) {
  const location = await fetchLocationInfo((await params).name);
  
  return (
    <div>
      <main>
        <section>
          <h1>
            {capitalize(location.name, "location")}
          </h1>
          <h2>
            {capitalize(location.region, "location")}
          </h2>
        </section>
        <section>
          <ul>
            {location.areas.map((area) => (
              <li
                key={area.name}
              >
                <h3>
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