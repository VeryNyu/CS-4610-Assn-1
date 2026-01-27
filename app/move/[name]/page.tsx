import { fetchMoveInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/formatting_";
import { SearchableList } from "@/app/_components/list_";
import { StaticListSection, SubPage } from "@/app/_components/page_sections_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Moves({ params }: PageProps) {
  const moves = await fetchMoveInfo((await params).name);
  
  return (
    <SubPage title={capitalize(moves.name, "move")}>
      <StaticListSection title="Stats">
        <ul className="stats-grid">
          <li>Power: {moves.power}</li>
          <li>Accuracy: {moves.accuracy}</li>
          <li>PP: {moves.pp}</li>
        </ul>
      </StaticListSection>
      <StaticListSection title="Flavor Text">
        <ul className="list-grid">
          {moves.flavorText.map((entry, index) => (
            <li
              key={index}
              className="list-item"
              >
                "{entry.flavorText}"<br/><br/> - {capitalize(entry.game, "game")}
            </li>
          ))}
        </ul>
      </StaticListSection>
      <StaticListSection title="Learned By">
        <SearchableList list={moves.results} />
      </StaticListSection>
    </SubPage>
  );
}