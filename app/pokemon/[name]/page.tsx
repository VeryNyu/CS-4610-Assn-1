import { fetchPokemonInfo } from "@/utils/pokeapi";
import { StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/capitalize_";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const pokemon = await fetchPokemonInfo((await params).name);
  
  return (
    <div>
      <main>
        <h1>
          {capitalize(pokemon.name, "pokemon")}
        </h1>
        <section>
          <h2>
            Sprites
          </h2>
        </section>
        <section>
          <h2>
            Stats
          </h2>
        </section>
        <section>
          <h2>
            Locations
          </h2>
          <StaticList list={{
            root: "location",
            results: pokemon.locations
            }} />
        </section>
        <section>
          <h2>
            Learnable Moves
          </h2>
          <StaticList list={{
            root: "move",
            results: pokemon.moveList
            }} />
        </section>
      </main>
    </div>
  );
}
