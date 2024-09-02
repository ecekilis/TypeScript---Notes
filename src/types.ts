export type Tag = {
    label: string;
    value: string;
}

// formdan alinacak olan note verisinin tipi
export type NoteData = {
    title: string;
    tags: Tag[];
    markdown: string;
}

// state'e kaydedilecek olan note verisinin tipi(id eklenmis hali)

export type Note = {
    id: string;
} & NoteData;