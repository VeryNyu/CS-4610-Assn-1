import { fetchGenerationInfo } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/capitalize_";
import { SearchableList } from "@/app/_components/list_";


interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Generation({ params }: PageProps) {
  const generation = await fetchGenerationInfo((await params).name);
  
  return (
    <div>
      <main>
        <section>
          <h1>
            {capitalize(generation.name, "generation")}
          </h1>
          <h2>
            {capitalize(generation.region, "region")}
          </h2>
        </section>
        <section>
          <h2>
            Pokemon
          </h2>
          <SearchableList list = {generation.results}/>
        </section>
      </main>
    </div>
  );
}