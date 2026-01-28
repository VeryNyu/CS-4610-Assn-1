import { fetchPokemonInfo } from "@/utils/pokeapi";
import { SearchableList, StaticList } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/formatting_";
import SpriteGallery, { StaticListSection, SubPage } from "@/app/_components/page_sections_";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const pokemon = await fetchPokemonInfo((await params).name);

  return (
    <SubPage title={capitalize(pokemon.name, "pokemon")}>
      <ul className=" list-grid">
      <SpriteGallery sprites={{
        front_default: pokemon.sprites.default,
        front_shiny: pokemon.sprites.shiny
      }} />
      <StaticListSection title="Stats">
        <ul className="stats-grid">
          {pokemon.stats.map((stat) => (
          <li
          key={stat.name}
          className="h-10 w-50 px-3 flex items-center justify-between
          bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <span className="font-medium">
              {capitalize(stat.name, "move")}
            </span>

            <span className="font-mono">
              {stat.value}
            </span>
          </li>
          ))}
        </ul>
      </StaticListSection>
          </ul>
      <StaticListSection title="Locations">
        <StaticList list={{
          root: "location",
          results: pokemon.locations
        }} />
      </StaticListSection>
      <StaticListSection title="Learnable Moves">
        <SearchableList list={{
          root: "move",
          results: pokemon.moveList
        }} />
      </StaticListSection>
    </SubPage>
  );
}
