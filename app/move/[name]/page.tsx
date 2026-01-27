import { fetchMoveInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/capitalize_";
import { SearchableList } from "@/app/_components/list_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Moves({ params }: PageProps) {
  const moves = await fetchMoveInfo((await params).name);
  
  return (
    <div>
      <main>
        <section>
          <h1>
            {capitalize(moves.name, "move")}
          </h1>
        </section>
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
        <section>
          <h2>
            Learned By Pokemon
          </h2>
          <SearchableList list={moves.results} />
        </section>
      </main>
    </div>
  );
}