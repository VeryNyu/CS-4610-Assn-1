import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";
import { IndexPage } from "../_components/page_sections_";

export default async function movePage() {
    const results = await fetchList("move");
    
      return (
        <IndexPage title="Moves">
          <SearchableList list={results} />
        </IndexPage>
      );
    }