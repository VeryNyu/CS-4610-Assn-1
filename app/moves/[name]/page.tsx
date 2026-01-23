interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function Moves({ params }: PageProps) {
  const { name } = await params;
  
  return (
    <div>
      <h1>Move Name: {name}</h1>
      <p>This page displays content for the move with name: {name}</p>
    </div>
  );
}