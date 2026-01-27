import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";

export default async function PokemonPage() {
  const pokemon = await fetchList("pokemon");

  return (
    <div>
      <main className="page-container">
        <section>
        <h1 className="page-header">
          Pokemon
        </h1>
          <SearchableList list = {pokemon}/>
        </section>
      </main>
    </div>
  );
}