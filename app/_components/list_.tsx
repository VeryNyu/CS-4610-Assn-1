"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListData } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/formatting_";


type ListProps = {
    list: ListData;
}

export function StaticList({list}: ListProps) {
    if (!list.results || list.results.size === 0) {
        return <div>No {list.root} found.</div>;
    } else {
        return (
            <div>
                <ul className="list-grid">
                    {Array.from(list.results).map((item: string) => (
                        <Link href={`/${list.root}/${item}`} key={item}>
                            <li
                                key={item}
                                className="list-item"
                                >
                                {capitalize(item, list.root)}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}


export function SearchableList({list}: ListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredList = Array.from(list.results).filter((item: string) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
            <div>
            <input
                type="text"
                placeholder={`Search for ${capitalize(list.root, list.root)}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            <ul className="list-grid">
                {filteredList.map((item: string) => (
                    <Link href={`/${list.root}/${item}`} key={item}>
                        <li
                            key={item}
                            className="list-item"
                            >
                            {capitalize(item, list.root)}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default function BackButton() {
    const router = useRouter();

    return (
    <button
        onClick={() => router.back()}
        className=""
    >
        ← Back
    </button>
    );
}