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