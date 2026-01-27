export type ListData = {
    root: string;
    results: Set<string>;
}

export async function fetchList(root: string): Promise<ListData> {
    const response = await fetch(`https://pokeapi.co/api/v2/${root}/?limit=-1`)
    const data = await response.json();
    const list: Set<string> = new Set(
        data.results.map((item: any) =>
            item.name
        )
    );

    return {
        root: root,
        results: list
    };
}

// FETCH POKEMON INFO
type PokemonResult = {
    location_area_encounters: any;
    name: string;
    stats: {
        name: string;
        value: number;
    }[];
    sprites: {
        default: string;
        shiny: string;
    };
    locations: Set<string>;
    moveList: Set<string>;
}

export async function fetchPokemonInfo(PokemonName: string): Promise<PokemonResult> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    const data: any = await response.json();

    const statsList = data.stats.map((item: any) => ({
        name: item.stat.name,
        value: item.base_stat
    }));


    const locationAreaResponse = await fetch(data.location_area_encounters);
    const locationAreaData = await locationAreaResponse.json();
    const locationList = new Set<string>(await Promise.all(
        locationAreaData.map(async (area: any) => {
            const areaResponse = await fetch(area.location_area.url);
            const areaData = await areaResponse.json();
            return areaData.location.name;
        })
    ));
    
    const movesList = new Set<string>(
        data.moves.map((item: any) => 
            item.move.name,
        )
    );

    return {
        location_area_encounters: null,
        name: data.name,
        stats: statsList,
        sprites: {
            default: data.sprites.front_default,
            shiny: data.sprites.front_shiny
        },
        locations: locationList,
        moveList: movesList
    };
}

// FETCH LOCATION INFO
type LocationResult = {
    name: string;
    region: string;
    areas: AreaResult[];
}

type AreaResult = {
    name: string;
    encounters: Set<string>;
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

            const encountersSet = new Set<string>(
                areaData.pokemon_encounters.map((item: any) => 
                    item.pokemon.name)
            );
            
            return {
                name: area.name,
                encounters: encountersSet,
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
    results: ListData;
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
        .map((item: any) => ({
            flavorText: item.flavor_text,
            game: item.version_group.name,
        }));

    const list = new Set<string>(
        data.learned_by_pokemon.map((item: any) => 
            item.name
    )
    );

    return {
        name: data.name,
        accuracy: data.accuracy,
        pp: data.pp,
        power: data.power,
        flavorText: flavorTextEntries,
        results: {
            root: "pokemon",
            results: list
        }
    };
}

// FETCH GENERATION INFO
type GenerationResult = {
    name: string;
    region: string;
    results: ListData;
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
        case "ix": index = 9; break;
        default: throw new Error("Invalid generation name");
    }
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${index}`);
    const data = await response.json();
    const list: Set<string> = new Set(
        data.pokemon_species.map((item: any) =>
            item.name
    )
    );

    return {
        name: data.name,
        region: data.main_region.name,
        results: {
            root: "pokemon",
            results: list
        }
    };
}