'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { IBooksDataType } from '@/interfaces/IBooksDataType';
import { BooksProvider } from '@/contexts/Books';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const [booksData, setBooksData] = useState<IBooksDataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const resetBooksData = () => {
    setBooksData([]);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };

  return (
    <BooksProvider>
      <ToastContainer/>
      <div className='min-h-screen flex flex-col justify-between'>
        <Header resetBooksData={resetBooksData} resetSearchValue={resetSearchValue}/>
        <div className='flex justify-center'>
          <main className='flex flex-col'>
            <SearchBar 
              booksData={booksData} 
              setBooksData={setBooksData} 
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
            />
          </main>
        </div>
        <Footer/>
      </div>
    </BooksProvider>
  )
}
