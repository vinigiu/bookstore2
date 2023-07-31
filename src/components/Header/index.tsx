'use client'
import Link from "next/link";
import { useCallback } from "react";
import { Home } from "./styles";

type THeader = {
    resetBooksData?: () => void;
    resetSearchValue?: () => void;  
}

export default function Header({ resetBooksData, resetSearchValue }: THeader) {
    const handleClick = useCallback(() => {
        if (resetBooksData && resetSearchValue) {
            resetBooksData();
            resetSearchValue();
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