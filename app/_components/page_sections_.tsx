import BackButton from "./list_";

type PageLayoutProps = {
    title: string;
    children: React.ReactNode;
}

export function IndexPage({title, children}: PageLayoutProps) {
    return (
        <section className="section">
            <h1 className="page-header">
                {title}
            </h1>
            {children}
        </section>
    );
}

export function SubPage({title, children}: PageLayoutProps) {
    return (
        <section className="section">
            <BackButton />
            <h1 className="page-header">
                {title}
            </h1>
            {children}
        </section>
    );
}

export function StaticListSection({title, children}: PageLayoutProps) {
    return (
        <section>
            <h2 className="page-subheader">
                {title}
            </h2>
            {children}
        </section>
    );
}

type SpriteGalleryProps = {
  sprites: {
    front_default?: string;
    front_shiny?: string;
  };
};

export default function SpriteGallery({ sprites }: SpriteGalleryProps) {
  const spriteEntries = Object.entries(sprites)
    .map(([key, url]) => ({ key, url }));

  return (
    <ul className="image-row">
      {spriteEntries.map(sprite => (
        <li key={sprite.key}>
          <img
            src={sprite.url}
            alt={sprite.key}
           />
        </li>
      ))}
    </ul>
  );
}
