import { url } from "inspector";

// FETCH LIST
type ListResult = {
    name: string;
    root: string;
}

export type ListResponse = {
    results: ListResult[];
}

export async function fetchList(ListType: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/${ListType}/?limit=-0`)
    const list = await response.json() as ListResponse;
    list.results.forEach((result, index) => {
        result.root = ListType;
    });
    return list
}

// FETCH POKEMON INFO
type PokemonResult = {
    id: number;
    name: string;
    abilities: ListResult[];
    locations: ListResult[];
    moves: ListResult[];
    stats: [];
    location_area_encounters: any;
}

export async function fetchPokemonInfo(PokemonName: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    const data = await response.json() as PokemonResult;
    const locationResponse = await fetch(data.location_area_encounters);
    const locationData = await locationResponse.json();
    const locationList: ListResult[] = locationData.map((area: any) => ({
        name: area.location_area.name.split("-").slice(0, -1).join("-"),
        root: "location",
    }));
    const moveList: ListResult[] = data.moves.map((root: any) => ({
        name: root.move.name,
        root: "move",
    }));
    return {
        id: data.id,
        name: data.name,
        locations: locationList,
        moves: moveList,
        stats: data.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat
        })),
        location_area_encounters: null
    }
}

// FETCH LOCATION INFO
type LocationResult = {
    name: string;
    region: string;
    areas: AreaResult[];
}

type AreaResult = {
    name: string;
    encounters: EncounterResult[];
}

type EncounterResult = {
    name: string;
    url: string;
}

export async function fetchLocationInfo(
    locationName: string
): Promise<LocationResult> {
    const locationResponse = await fetch(`https://pokeapi.co/api/v2/location/${locationName}`);
    const locationData = await locationResponse.json();

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

// FETCH MOVE INFO
type MoveResult = {
    name: string;
    accuracy: number;
    pp: number;
    power: number;
    flavorText: FlavorTextEntry[];
    results: ListResult[];
    flavor_text_entries: any;
}

type FlavorTextEntry = {
    flavorText: string;
    game: string;
}

export async function fetchMoveInfo(
    moveName: string
): Promise<MoveResult> {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    const data = await response.json();
    const flavorTextEntries: FlavorTextEntry[] = data.flavor_text_entries
        .filter((entry: any) => entry.language.name === "en")
        .map((entry: any) => ({
            flavorText: entry.flavor_text,
            game: entry.version_group.name,
        }));

    data.flavorText = flavorTextEntries;

    return {
        name: data.name,
        accuracy: data.accuracy,
        pp: data.pp,
        power: data.power,
        flavorText: flavorTextEntries,
        results: data.learned_by_pokemon.map((pokemon: any) => ({
            name: pokemon.name,
            root: "pokemon",
        })),
        flavor_text_entries: null
    };
    // data.flavorText = data.flavor_text_entries.map((entry: any) => ({
    //     flavorText: entry.flavor_text,
    //     game: entry.version_group.name,
    // }));
}

// FETCH GENERATION INFO
type GenerationResult = {
    name: string;
    region: string;
    results: ListResult[];
    main_region: any;
    pokemon_species: any;
}


export async function fetchGenerationInfo(
    generationName: string
): Promise<GenerationResult> {
    var index;
    switch (generationName.split("-")[1]) {
        case "i": index = 1; break;
        case "ii": index = 2; break;
        case "iii": index = 3; break;
        case "iv": index = 4; break;
        case "v": index = 5; break;
        case "vi": index = 6; break;
        case "vii": index = 7; break;
        case "viii": index = 8; break;
        default:
            throw new Error("Invalid generation name");
    }
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${index}`);
    const data = await response.json() as GenerationResult;
    data.pokemon_species.forEach((species: any) => {
        species.root = "pokemon";
    });

    return {
        name: data.name,
        region: data.main_region.name,
        results: data.pokemon_species,
        main_region: null,
        pokemon_species: null
    }
}