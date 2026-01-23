interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Pokemon({ params }: PageProps) {
  const { name } = await params;
  
  return (
    <div>
      <h1>Pokemon Name: {name}</h1>
      <p>This page displays content for the pokemon with name: {name}</p>
    </div>
  );
}