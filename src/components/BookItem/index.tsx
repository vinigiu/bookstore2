'use client'
/* eslint-disable @next/next/no-img-element */
import { IBooksDataType } from "@/interfaces/IBooksDataType";
import Link from "next/link";
import { useMemo } from "react";
import { AuthorTitle, BookAuthor, BookCard, BookImageContainer, BookTitle } from './styles';

type TBookItem = {
    item: IBooksDataType;
} 

export default function BookItem ({ item }:TBookItem) {
    const image = useMemo(() => {
        if(item.volumeInfo?.imageLinks?.smallThumbnail) {
            return <img className="min-w-28 w-28 h-32" src={item.volumeInfo?.imageLinks?.smallThumbnail} alt='imagem do livro'/>
        }
        return <div className="bg-myImg w-28 h-32 bg-cover bg-center bg-no-repeat"/>
    }, [item.volumeInfo?.imageLinks?.smallThumbnail])


    return (
        <Link href={`book/${item.id}`}>
            <BookCard className="mb-5 max-w-xl flex">
                <BookImageContainer className="mr-5">
                    {image}
                </BookImageContainer>
                <div className="flex flex-col">
                    <BookTitle>
                        {item.volumeInfo?.title}
                    </BookTitle>
                    <AuthorTitle className="mt-5">
                        {item.volumeInfo?.authors?.length > 1 
                            ? 'Autores:'
                            : 'Autor:'
                        }
                    </AuthorTitle>
                    <ul>
                    {item?.volumeInfo?.authors ? item?.volumeInfo?.authors.map((author,index) => 
                        <BookAuthor key={index} className="list-disc ml-5">{author}</BookAuthor>
                    ) : <div className="text-my-purple">Informação não disponível</div>
                    }
                    </ul>
                </div>
            </BookCard>
        </Link>
    );
}