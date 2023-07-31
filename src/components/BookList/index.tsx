'use client'
import BookItem from "../BookItem";
import { useMemo } from 'react';
import { IBooksDataType } from "@/interfaces/IBooksDataType";

export type TBookList = {
    booksData: IBooksDataType[]
}

export default function BookList ({ booksData }: TBookList) {
    const hasBookItems = useMemo(() => booksData.length > 0, [booksData])

    return (
        <div>
            {hasBookItems 
                ? booksData.map(item => <BookItem key={item.id} item={item}/>) 
                : null
            }
        </div>
    );
}