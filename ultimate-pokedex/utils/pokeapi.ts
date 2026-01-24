// POKEMON SPECIES
export type PokemonResult = {
    name: string;
    url: string;
    status: string;
}

type PokemonResponse = {
    results: PokemonResult[];
}

export async function fetchPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=-0")
    const pokemon = await response.json() as PokemonResponse;
    return pokemon
}

// POKEMON LOCATIONS
export type LocationResult = {
    name: string;
    url: string;
    status: string;
}

type LocationResponse = {
    results: LocationResult[];
}

export async function fetchLocations(){
    const response = await fetch("https://pokeapi.co/api/v2/location/?limit=-0")
    const locations = await response.json() as LocationResponse;
    return locations
}

// POKEMON MOVES
export type MoveResult = {
    name: string;
    url: string;
    status: string;
}

type MoveResponse = {
    results: MoveResult[];
}

export async function fetchMoves(){
    const response = await fetch("https://pokeapi.co/api/v2/move/?limit=-0")
    const moves = await response.json() as MoveResponse;
    return moves
}

// POKEMON GENERATIONS
export type GenerationResult = {
    name: string;
    url: string;
    status: string;
}

type GenerationResponse = {
    results: GenerationResult[];
}

export async function fetchGenerations(){
    const response = await fetch("https://pokeapi.co/api/v2/generation/?limit=-0")
    const generations = await response.json() as GenerationResponse;
    return generations
}