import { fetchGenerationInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/formatting_";
import { SearchableList } from "@/app/_components/list_";
import { ListSection, SubPage } from "@/app/_components/page_sections_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Generation({ params }: PageProps) {
  const generation = await fetchGenerationInfo((await params).name);
  
  return (
    <SubPage title={`${capitalize(generation.name, "generation")}: ${capitalize(generation.region, "region")}`}>
      <ListSection title="Pokemon">
        <SearchableList list = {generation.results}/>
      </ListSection>
    </SubPage>);
}