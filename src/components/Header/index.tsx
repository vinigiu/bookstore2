'use client'
import Link from "next/link";
import { useCallback } from "react";
import { Home } from "./styles";

type THeader = {
    resetBooksData?: () => void;
    resetSearchValue?: () => void;
    resetSearchType?: () => void;  
}

export default function Header({ 
    resetBooksData, 
    resetSearchValue, 
    resetSearchType 
}: THeader) {
    const handleClick = useCallback(() => {
        if (resetBooksData && resetSearchValue && resetSearchType) {
            resetBooksData();
            resetSearchValue();
            resetSearchType();
        }
    },[])
    
    return (
        <Link href={'/'} onClick={handleClick}>
            <Home className="h-14 pt-5 pl-5">
                Home
            </Home>
        </Link>
    );
}