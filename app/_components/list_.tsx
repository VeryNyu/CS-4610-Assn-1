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
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from(list.results).map((item: string) => (
                    <li
                        key={item}
                        className="rounded-lg border border-gray-300 bg-gray-100 p-4 text-center dark:border-gray-700 dark:bg-gray-900"
                    >
                        <Link
                            href={`/${list.root}/${item}`}
                            className="text-blue-600 hover:underline dark:text-blue-400"
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
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredList.map((item: string) => (
                    <li
                        key={item}
                        className="rounded-lg border border-gray-300 bg-gray-100 p-4 text-center dark:border-gray-700 dark:bg-gray-900"
                    >
                        <Link
                            href={`/${list.root}/${item}`}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                            {capitalize(item, list.root)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        );
}