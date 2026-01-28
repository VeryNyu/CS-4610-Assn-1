import { fetchLocationInfo } from "@/utils/pokeapi";
import { StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/formatting_";
import { StaticListSection, SubPage } from "@/app/_components/page_sections_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Location({ params }: PageProps) {
  const location = await fetchLocationInfo((await params).name);
  
  return (
    <SubPage title={`${capitalize(location.name, "location")}: ${capitalize(location.region, "location")}`}>
      <section>
        <ul>
          {location.areas.map((area) => (
            <li
            key={area.name}
            >
            <StaticListSection title={capitalize(area.name, "location")}>
              <StaticList list={{
              root: "pokemon",
              results: area.encounters
              }} />
            </StaticListSection>
            </li>
          ))}
        </ul>
      </section>
    </SubPage>
  );
}