'use client'

import Header from '@/components/Header';
import BookDetails from "@/components/BookDetails";
import { BooksProvider } from '@/contexts/Books';
import Footer from '@/components/Footer';

export default function Book( { params }: { params: { bookId: string } }) {
    return (
      <BooksProvider>
        <div className='min-h-screen flex flex-col justify-between'>
          <Header/>
          <BookDetails item={params.bookId}/>
          <Footer/>
        </div>
      </BooksProvider>
    )
  }