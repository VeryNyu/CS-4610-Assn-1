"use client";
import { PokemonResponse, LocationResponse, MoveResponse, GenerationResponse } from "@/utils/pokeapi";
import Link from "next/link";
import { useState } from "react";


type searchablePokemonListProps = {
    pokemon: PokemonResponse;
}

export function SearchablePokemonList({ pokemon }: searchablePokemonListProps) {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredPokemon = pokemon.results.map((pokemon) =>
            pokemon.name
        ).filter((pokemon) =>
            pokemon.toLowerCase().includes(searchTerm.toLowerCase())
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
                {filteredPokemon.map((pokemon) => (
                <li
                    key={pokemon}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <Link href={`/pokemon/${pokemon}`} className="hover:underline">
                    {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

type searchableLocationListProps = {
    location: LocationResponse;
}

export function SearchableLocationList({ location }: searchableLocationListProps) {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredLocations = location.results.map((location) =>
            location.name
        ).filter((location) =>
            location.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for Location..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredLocations.map((location) => (
                <li
                    key={location}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <Link href={`/Location/${location}`} className="hover:underline">
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

type searchableMoveListProps = {
    move: MoveResponse;
}

export function SearchableMoveList({ move }: searchableMoveListProps) {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredMoves = move.results.map((move) =>
            move.name
        ).filter((move) =>
            move.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for Move..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredMoves.map((move) => (
                <li
                    key={move}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <Link href={`/moves/${move}`} className="hover:underline">
                    {move.charAt(0).toUpperCase() + move.slice(1)}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

type searchableGenerationListProps = {
    generation: GenerationResponse;
}

export function SearchableGenerationList({ generation }: searchableGenerationListProps) {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredGenerations = generation.results.map((generation) =>
            generation.name
        ).filter((generation) =>
            generation.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for Generation..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredGenerations.map((generation) => (
                <li
                    key={generation}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 text-center text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <Link href={`/generations/${generation}`} className="hover:underline">
                    {generation.charAt(0).toUpperCase() + generation.slice(1, generation.indexOf('-')) + generation.slice(generation.indexOf('-')).toUpperCase()}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}