'use client'
import { BooksContext } from "@/contexts/Books";
import BookList from "../BookList";
import { useCallback, useContext } from "react";
import { IBooksDataType } from "@/interfaces/IBooksDataType";
import { toast } from "react-toastify";
import { Input, SearchButton, Title } from './styles';
import { Bungee } from 'next/font/google'

type TSearchBar = {
    booksData: IBooksDataType[];
    setBooksData: any;
    searchValue: string;
    setSearchValue: any;
}

const bungee = Bungee({weight: '400', subsets: ['latin']})

export default function SearchBar({ booksData, setBooksData, searchValue, setSearchValue }: TSearchBar ) {
    const { getBooksBySearch } = useContext(BooksContext);

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        const data  = await getBooksBySearch(searchValue);
        if (!(data instanceof Error) && data.length > 0) {
            setBooksData(data);
        } else if (data instanceof Error) {
            toast.error(data.message, {autoClose: 7000})
        }
    }, [searchValue]);

    const handleInputChange = useCallback((e: any) => {
        setSearchValue(e.target.value);
    }, [setSearchValue])

    return (
        <>
            <Title className={`self-center mb-5 ${bungee.className}`}>Book Finder</Title>
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
            <BookList booksData={booksData}/>
        </>
    );
}