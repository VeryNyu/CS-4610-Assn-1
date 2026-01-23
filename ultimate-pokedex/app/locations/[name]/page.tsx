interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Location({ params }: PageProps) {
  const { name } = await params;
  
  return (
    <div>
      <h1>Location Name: {name}</h1>
      <p>This page displays content for the location with name: {name}</p>
    </div>
  );
}