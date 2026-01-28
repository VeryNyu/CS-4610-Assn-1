import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";
import { IndexPage } from "../_components/page_sections_";


export default async function GenerationPage() {
  const results = await fetchList("generation");
  
    return (
      <IndexPage title="Generations">
        <SearchableList list={results} />
      </IndexPage>
    );
  }