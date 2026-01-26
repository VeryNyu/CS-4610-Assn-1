"use client";
import { ListResponse } from "@/utils/pokeapi";
import Link from "next/link";
import { useState } from "react";

type searchableListProps = {
    list: ListResponse;
}

export function SearchableList({list}: searchableListProps) {
    const root = list.results[0].root;
    const [searchTerm, setSearchTerm] = useState("");
    const filteredList = list.results.map((list) =>
        list.name
    ).filter((list) =>
        list.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for Pokemon..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredList.map((list) => (
                    <li
                    key={list}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                    <Link href={`/${root}/${list}`} className="hover:underline">
                    {list.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}