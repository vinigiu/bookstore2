'use client'
import { BooksContext } from "@/contexts/Books";
import BookList from "../BookList";
import { useCallback, useContext, useState } from "react";
import { IBooksDataType } from "@/interfaces/IBooksDataType";
import { toast } from "react-toastify";
import { Input, SearchButton, SearchTypeButton, Title } from './styles';
import { Bungee } from 'next/font/google'

type TSearchBar = {
    booksData: IBooksDataType[];
    setBooksData: any;
    searchValue: string;
    setSearchValue: any;
    searchType: string;
    setSearchType: any;
}

const bungee = Bungee({weight: '400', subsets: ['latin']})

export default function SearchBar({ 
    booksData, 
    setBooksData, 
    searchValue, 
    setSearchValue, 
    searchType, 
    setSearchType 
}: TSearchBar ) {
    const { getBooksBySearch, getBooksByTitle, getBooksByAuthor } = useContext(BooksContext);

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        if(searchType === 'both') {
            const data  = await getBooksBySearch(searchValue);
            if (!(data instanceof Error) && data.length > 0) {
                setBooksData(data);
            } else if (data instanceof Error) {
                toast.error(data.message, {autoClose: 7000})
            }
        } else if(searchType === 'title') {
            const data  = await getBooksByTitle(searchValue);
            if (!(data instanceof Error) && data.length > 0) {
                setBooksData(data);
            } else if (data instanceof Error) {
                toast.error(data.message, {autoClose: 7000})
            }
        } else {
            const data  = await getBooksByAuthor(searchValue);
            if (!(data instanceof Error) && data.length > 0) {
                setBooksData(data);
            } else if (data instanceof Error) {
                toast.error(data.message, {autoClose: 7000})
            }
        }
    }, [searchValue, searchType]);

    const handleInputChange = useCallback((e: any) => {
        setSearchValue(e.target.value);
    }, [setSearchValue])

    const handleSearchTypeTitle = useCallback(() => {
        searchType === 'title' ? setSearchType('both') : setSearchType('title');
    }, [searchType])

    const handleSearchTypeAuthor = useCallback(() => {
        searchType === 'author' ? setSearchType('both') : setSearchType('author');
    }, [searchType])

    return (
        <>
            <Title className={`lg:text-7xl self-center mb-5 ${bungee.className} md:text-6xl sm:text-5xl min-[250px]:text-3xl`}>Book Finder</Title>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='flex justify-center pb-10'>
                    <Input
                        type="text"
                        className="border-2 border-gray-300 rounded-full self-center outline-none pl-2 py-3 px-32"
                        placeholder="Busque por seu livro"
                        value={searchValue}
                        onChange={e => handleInputChange(e)}
                    />
                    <SearchButton className="ml-5" type="submit">Buscar</SearchButton>
                </div>
            </form>
            <div className="flex justify-center gap-6 mb-10">
                <SearchTypeButton 
                    selected={searchType === 'title'} 
                    onClick={handleSearchTypeTitle}
                >
                    Buscar Título
                </SearchTypeButton>
                <SearchTypeButton
                    selected={searchType === 'author'} 
                    onClick={handleSearchTypeAuthor}
                >
                    Buscar Autor
                </SearchTypeButton>
            </div>
            <BookList booksData={booksData}/>
        </>
    );
}