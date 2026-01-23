interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Generation({ params }: PageProps) {
  const { name } = await params;
  
  return (
    <div>
      <h1>Generation Name/Number: {name}</h1>
      <p>This page displays content for the Generation with name/number: {name}</p>
    </div>
  );
}