/* eslint-disable @next/next/no-img-element */
'use client'
import { IBooksDataType } from "@/interfaces/IBooksDataType";
import { BooksContext } from '@/contexts/Books';
import { useContext, useEffect, useMemo, useState } from 'react';
import { 
    Author,
    AuthorContainer,
    BookDetailsContainer, 
    Description, 
    ImageContainer,
    InfoContainer, 
    MainCategory,
    PageCount,
    PublishedDate,
    Publisher,
    Title,
} from './styles';

type TBookDetails = {
    item: string,
}

export default function BookDetails ({ item }: TBookDetails) {
    const { getBookInfo } = useContext(BooksContext);
    const [bookInfo, setBookInfo] = useState<IBooksDataType | Error>();

    const image = useMemo(() => {
        if(!(bookInfo instanceof Error) && bookInfo?.volumeInfo.imageLinks?.thumbnail) {
            return <img className="min-w-28 w-64 h-78" src={bookInfo?.volumeInfo.imageLinks?.thumbnail} alt='imagem do livro'/>
        }
        return <div className="bg-myImg w-64 h-72 bg-cover bg-center bg-no-repeat"/>
    }, [bookInfo])
    
    useEffect(() => {
        (async () => {
            const info = await getBookInfo(item);
            setBookInfo(info);
        })()
    },[])
    
    if(bookInfo instanceof Error) return null

    return (
        <BookDetailsContainer className="pl-10 flex">
            <ImageContainer className="w-1/5 self-center">
                {image}
            </ImageContainer>
            <InfoContainer className="w-2/4 ml-10">
                <Title className="mb-10">
                    {bookInfo?.volumeInfo.title}
                </Title>
                <Description className="mb-10" dangerouslySetInnerHTML={{__html:bookInfo?.volumeInfo?.description ? bookInfo?.volumeInfo?.description :  'Não há descrição disponível em nossa base'}}/>
                <AuthorContainer className="mb-10">
                    {bookInfo?.volumeInfo?.authors!== undefined && bookInfo?.volumeInfo?.authors?.length > 1 
                        ? 'Autores:'
                        : 'Autor:'
                    }
                    {bookInfo?.volumeInfo?.authors ? bookInfo?.volumeInfo?.authors.map((author,index) => 
                        <Author key={index} className="list-disc ml-5">{author}</Author>
                    ) : <div className="text-my-purple">Informação não disponível</div>
                    }
                </AuthorContainer>
                <MainCategory className="mb-10">
                    Categoria: {bookInfo?.volumeInfo?.mainCategory ? bookInfo?.volumeInfo.mainCategory : 'Informação não disponível'}
                </MainCategory>
                <Publisher className="mb-10">
                    Editora: {bookInfo?.volumeInfo?.publisher ? bookInfo?.volumeInfo.publisher : 'Informação não disponível'}
                </Publisher>
                <PublishedDate className="mb-10">
                    Data de Publicação: {bookInfo?.volumeInfo.publishedDate ? bookInfo?.volumeInfo.publishedDate : 'Informação não disponível'}
                </PublishedDate>
                <PageCount className="mb-10">
                    Número de páginas: {bookInfo?.volumeInfo.pageCount ? bookInfo?.volumeInfo.pageCount : 'Informação não disponível'}
                </PageCount>
            </InfoContainer>
        </BookDetailsContainer>
    );
}