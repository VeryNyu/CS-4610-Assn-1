type IndexPageLayoutProps = {
    title: string;
    children: React.ReactNode;
}

export function IndexPage({title, children}: IndexPageLayoutProps) {
    return (
        <section className="section">
            <h1 className="page-header">
                {title}
            </h1>
            {children}
        </section>
    );
}