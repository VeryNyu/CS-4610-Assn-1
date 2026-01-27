export type ListData = {
    root: string;
    results: Set<string>;
}

export async function fetchList(root: string): Promise<ListData> {
    const response = await fetch(`https://pokeapi.co/api/v2/${root}/?limit=-0`)
    const data = await response.json();
    const list: Set<string> = new Set(
        data.results.map((item: any) =>
            item.name,
        )
    );
    // const list = data.results.map((item: any) =>
    //     item.name,
    // );

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
    sprites: null;
    locations: Set<string>;
    moveList: Set<string>;
}

export async function fetchPokemonInfo(PokemonName: string): Promise<PokemonResult> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    const data: any = await response.json() as PokemonResult;

    const statsList = data.stats.map((item: any) => ({
        name: item.stat.name,
        value: item.base_stat
    }));

    const locationAreaResponse = await fetch(data.location_area_encounters);
    const locationAreaData = await locationAreaResponse.json();
    const locationList = new Set<string>(await Promise.all(
        locationAreaData.map(async (encounter: any) => {
            const areaResponse = await fetch(encounter.location_area.url);
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
        sprites: null,
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
    // console.log(locationData);

    const areas: AreaResult[] = await Promise.all(
        locationData.areas.map(async (area: any) => {
            const areaResponse = await fetch(area.url);
            const areaData = await areaResponse.json();

            const encountersSet = new Set<string>(
                areaData.pokemon_encounters.map((encounter: any) => 
                    encounter.pokemon.name)
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
        //         name: area.name,
        //         encounters: areaData.pokemon_encounters.map((encounter: any) => 
        //             encounter.pokemon.name),
        //     };
        // })
    // );

    // return {
    //     name: locationData.name,
    //     region: locationData.region.name,
    //     areas: areas,
    // };
}

// FETCH MOVE INFO
type MoveResult = {
    name: string;
    accuracy: number;
    pp: number;
    power: number;
    flavorText: FlavorTextEntry[];
    results: ListResults[];
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
    results: ListResults[];
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