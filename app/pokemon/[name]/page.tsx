import { fetchPokemonInfo } from "@/utils/pokeapi";
import { StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/capitalize_";
import { StaticListSection, SubPage } from "@/app/_components/page_sections_";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const pokemon = await fetchPokemonInfo((await params).name);
 console.log(pokemon);
  return (
    <SubPage title={capitalize(pokemon.name, "pokemon")}>
      <section>
        <h2 className="page-subheader">
          Sprites
        </h2>
      </section>
      <section>
        <h2 className="page-subheader">
          Stats
        </h2>
        <div className="stats-grid">
          {pokemon.stats.map((stat) => (
            <div>{stat.name}: {stat.value}</div>
          ))}
        </div>
      </section>
      <StaticListSection title="Locations">
        <StaticList list={{
          root: "location",
          results: pokemon.locations
        }} />
      </StaticListSection>
      <StaticListSection title="Learnable Moves">
        <StaticList list={{
          root: "move",
          results: pokemon.moveList
        }} />
      </StaticListSection>
    </SubPage>
  );
}
