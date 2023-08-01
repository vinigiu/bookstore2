'use client'
import { PropsWithChildren, createContext, useCallback, useMemo } from "react";
import { api } from '@/api/api';
import { IBooksDataType } from "@/interfaces/IBooksDataType"

interface BooksData {
    getBooksBySearch: (searchValue: string) => Promise<IBooksDataType[] | Error>;
    getBooksByTitle: (searchValue: string) => Promise<IBooksDataType[] | Error>;
    getBooksByAuthor: (searchValue: string) => Promise<IBooksDataType[] | Error>;
    getBookInfo: (bookId: string) => Promise<IBooksDataType | Error>

};

export const BooksContext = createContext<BooksData>(
    {} as BooksData
);

export const BooksProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
    
    const getBooksBySearch = useCallback(async (searchValue: string): Promise<IBooksDataType[] | Error> => {
        try {
            const { data } = await api.get(`volumes?q=intitle:${searchValue}+inauthor:${searchValue}&maxResults=30`)
            if (data.totalItems === 0) {
                throw new Error('Não há resultados para sua busca. Tente alterá-la.')
            }
            return data.items;
        } catch (error: any) {
            return error as Error;
        }
    },[]);

    const getBooksByTitle = useCallback(async (searchValue: string): Promise<IBooksDataType[] | Error> => {
        try {
            const { data } = await api.get(`volumes?q=intitle:${searchValue}&maxResults=30`)
            if (data.totalItems === 0) {
                throw new Error('Não há resultados para sua busca. Tente alterá-la.')
            }
            return data.items;
        } catch (error: any) {
            return error as Error;
        }
    },[]);

    const getBooksByAuthor = useCallback(async (searchValue: string): Promise<IBooksDataType[] | Error> => {
        try {
            const { data } = await api.get(`volumes?q=inauthor:${searchValue}&maxResults=30`)
            if (data.totalItems === 0) {
                throw new Error('Não há resultados para sua busca. Tente alterá-la.')
            }
            return data.items;
        } catch (error: any) {
            return error as Error;
        }
    },[]);

    const getBookInfo = useCallback(async (bookId: string): Promise<IBooksDataType | Error> => {
        try {
            const { data } = await api.get(`volumes/${bookId}`)
            if (!data) {
                throw new Error('Não foi possível encontrar este livro')
            }
            return data;
        } catch (error: any) {
            return error as Error;
        }
    },[]);
    
    const BooksDataValue = useMemo(() => {
        return {
            getBooksBySearch,
            getBooksByTitle,
            getBooksByAuthor,
            getBookInfo
        };
    }, [
        getBooksBySearch,
        getBooksByTitle,
        getBooksByAuthor,
        getBookInfo,
    ]);

    return (
        <BooksContext.Provider value={BooksDataValue}>
            {children}
        </BooksContext.Provider>
    ) 
}




