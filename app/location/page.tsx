import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";


export default async function LocationPage() {

    const locations = await fetchList("location");

    return (
    <div>
      <main>
        <section>
            <h1>
                Locations
            </h1>
            <SearchableList list = {locations} />
            </section>
        </main>
    </div>
    );
}