import { fetchPokemonInfo } from "@/utils/pokeapi";
import { SearchableList, StaticList, StaticStats } from "@/app/_components/list_";
import { capitalize } from "@/app/_components/formatting_";
import { ListSection, SpriteGallery, SubPage } from "@/app/_components/page_sections_";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const pokemon = await fetchPokemonInfo((await params).name);

  return (
    <SubPage title={capitalize(pokemon.name, "pokemon")}>
      <ul className="list-grid">
      <ListSection title="Stats">
        <StaticStats list={{stats: pokemon.stats}} />
      </ListSection>
      <SpriteGallery sprites={{
        front_default: pokemon.sprites.default,
        front_shiny: pokemon.sprites.shiny
      }} />
          </ul>
      <ListSection title="Locations">
        <StaticList list={{
          root: "location",
          results: pokemon.locations
        }} />
      </ListSection>
      <ListSection title="Learnable Moves">
        <SearchableList list={{
          root: "move",
          results: pokemon.moveList
        }} />
      </ListSection>
    </SubPage>
  );
}
