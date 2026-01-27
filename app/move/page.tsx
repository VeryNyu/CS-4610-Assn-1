import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";

export default async function movePage() {

    const moves = await fetchList("move");

    return (
    <div>
      <main>
        <section>
            <h1>
                Moves
            </h1>
            <SearchableList list = {moves} />
            </section>
        </main>
    </div>
    );
}