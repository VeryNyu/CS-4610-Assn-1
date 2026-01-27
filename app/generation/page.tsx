import { fetchList } from "@/utils/pokeapi";
import { SearchableList } from "@/app/_components/list_";


export default async function GenerationPage() {

  const generation = await fetchList("generation");

  return (
    <div>
      <main>
        <section>
          <h1>
            Generations
          </h1>
          <SearchableList list = {generation} />
        </section>
      </main>
    </div>
  );
}