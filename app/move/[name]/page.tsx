import { fetchMoveInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/capitalize_";
import { SearchableList } from "@/app/_components/list_";
import { StaticListSection, SubPage } from "@/app/_components/page_sections_";


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
      <section>
        <h2>
          Stats
        </h2>
        <ul>
          <li>
              Accuracy: {moves.accuracy}
          </li>
          <li>
              Power: {moves.power}
          </li>
          <li>
              PP: {moves.pp}
          </li>
        </ul> 
      </section>
      <section>
        <h2>
          Flavor Text
        </h2>
        <ul>
          {moves.flavorText.map((entry, index) => (
            <li
              key={index}
              >
                "{entry.flavorText}"<br/><br/> - {capitalize(entry.game, "game")}
            </li>
          ))}
        </ul>
      </section>
      <StaticListSection title="Learned By">
        <SearchableList list={moves.results} />
      </StaticListSection>
    </SubPage>
  );
}