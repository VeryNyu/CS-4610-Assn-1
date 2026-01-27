"use client";
import Link from "next/link";
import { useState } from "react";
import { ListData } from "@/utils/pokeapi";
import { capitalize } from "@/app/_components/capitalize_";


type ListProps = {
    list: ListData;
}

export function StaticList({list}: ListProps) {
    return (
        <div>
            <ul >
                {Array.from(list.results).map((item: string) => (
                    <li
                        key={item}
                    >
                        <Link
                            href={`/${list.root}/${item}`}
                        >
                            {capitalize(item, list.root)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
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
            <ul >
                {filteredList.map((item: string) => (
                    <li
                        key={item}
                    >
                        <Link
                            href={`/${list.root}/${item}`}
                        >
                            {capitalize(item, list.root)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}