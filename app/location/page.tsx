import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";
import { IndexPage } from "../_components/page_sections_";


export default async function LocationPage() {
    const results = await fetchList("location");
    
      return (
        <IndexPage title="Locations">
          <SearchableList list={results} />
        </IndexPage>
      );
    }