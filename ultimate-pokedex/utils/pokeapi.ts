import { url } from "inspector";

// FETCH LIST
type ListResult = {
    name: string;
    url: string;
    root: string;
    status: string;
}

export type ListResponse = {
    results: ListResult[];
}

export async function fetchList(ListType: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/${ListType}/?limit=-0`)
    const list = await response.json() as ListResponse;
    list.results.forEach((result) => {
        result.root = ListType;
    });
    return list
}

// FETCH POKEMON INFO
type PokemonInfoResult = {
    id: number;
    name: string;
    abilities: [];
    locationURL: string;
    moves: [];
    stats: [];
}

export async function fetchPokemonInfo(PokemonName: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    const list = await response.json() as PokemonInfoResult;
    return list
}

// FETCH LOCATION INFO
type LocationResult = {
    name: string;
    region: string;
    areas: AreaResult[];
}

type RegionResult = {
    name: string;
}

type AreaResult = {
    name: string;
    encounters: EncounterResult[];
}

type EncounterResult = {
    name: string;
    url: string;
}

type LocationInfoResponse = {
    location: LocationResult;
}

export async function fetchLocationInfo(
    locationName: string
): Promise<LocationResult> {
    const locationResponse = await fetch(`https://pokeapi.co/api/v2/location/${locationName}`);
    const locationData = await locationResponse.json();

    // const locationRegion: RegionResult = await (async () => {
    //     locationData.region.map(async (region: any) => {
    //         const regionResponse = await fetch(region.url);
    //         const regionData = await regionResponse.json();
    //         return {
    //             name: regionData.name,
    //         };
    //     })

    const areas: AreaResult[] = await Promise.all(
        locationData.areas.map(async (area: any) => {
            const areaResponse = await fetch(area.url);
            const areaData = await areaResponse.json();

            return {
                name: area.name,
                encounters: areaData.pokemon_encounters.map((encounter: any) => ({
                    name: encounter.pokemon.name,
                    url: encounter.pokemon.url,
                })),
            };
        })
    );

    return {
        name: locationData.name,
        region: locationData.region.name,
        areas: areas,
    };
}



// export async function fetchLocationInfo(LocationName: string) {
//     const response = await fetch(`https://pokeapi.co/api/v2/location/${LocationName}`)
//     const list = await response.json() as LocationInfoResult;
//     return list
// }
