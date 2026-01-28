import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";
import { IndexPage } from "@/app/_components/page_sections_";

export default async function PokemonPage() {
  const results = await fetchList("pokemon");

  return (
    <IndexPage title="Pokemon">
      <SearchableList list={results} />
    </IndexPage>
  );
}