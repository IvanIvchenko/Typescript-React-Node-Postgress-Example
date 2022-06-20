export interface SuperheroFull{
    id: number,
    nickname: string,
    real_name: string,
    origin_description: string,
    superpowers: string,
    catch_phrase: string,
    mainImage: string,
    images: string[]
}

export interface SuperheroShort{
    id: number,
    nickname: string,
    mainImage: string
}

export interface ActionState{
    error: string | null,
    pagesNumber: number | null,
    fetchingSuperheroes: boolean,
    fetchingSuperhero: boolean,
    creatingSuperhero: boolean,
    deletingSuperhero: boolean,
    editingSuperhero: boolean,
    superheroes: SuperheroShort[] | null,
    superhero: SuperheroFull | null
}

export interface FormState{
    nickname: string,
    real_name: string,
    origin_description: string,
    superpowers: string,
    catch_phrase: string,
    mainImage: File | null,
    images: File[],
};
