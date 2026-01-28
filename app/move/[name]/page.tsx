import { fetchMoveInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/formatting_";
import { SearchableList, StaticStats } from "@/app/_components/list_";
import { ListSection, SubPage } from "@/app/_components/page_sections_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Moves({ params }: PageProps) {
  const moves = await fetchMoveInfo((await params).name);
  console.log(moves);
  
  return (
    <SubPage title={capitalize(moves.name, "move")}>
      <ListSection title="Stats">
        <StaticStats list={{stats: moves.stats}} />
      </ListSection>
      <ListSection title="Flavor Text">
        <ul className="list-grid">
          {moves.flavorText.map((entry, index) => (
            <li
              key={index}
              className="grid gap-4
              grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]
              px-2 items-stretch
              bg-white dark:bg-gray-800 rounded-lg shadow p-4;"
              >
                <span className="text-left">
                  "{entry.flavorText}"
                </span>
                <span className="text-right">
                  - {capitalize(entry.game, "game")}
                </span>
            </li>
          ))}
        </ul>
      </ListSection>
      <ListSection title="Learned By">
        <SearchableList list={moves.results} />
      </ListSection>
    </SubPage>
  );
}