import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import { Inter } from '@next/font/google';
import { createClient } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

type Book = {
  id: number;
  name: string;
  publisher: string;
  href: string;
  imageSrc: string;
};

export async function getStaticProps() {
  const { data } = await supabaseAdmin.from('books').select('*').order('id');
  return {
    props: {
      books: data,
    },
  };
}

export default function Gallery({ books }: { books: Book[]; }) {
  return (
    <>
      <Head>
        <title>Books gallery</title>
      </Head>
      <main className={inter.className}>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {books.map(book => (
              <BlurBook key={book.id} book={book} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function BlurBook({ book }: { book: Book; }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={book.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={book.imageSrc}
          fill
          style={{ objectFit: 'cover' }}
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100',
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm">{book.name}</h3>
      <p className="mt-1 text-lg font-medium">{book.publisher}</p>
    </a>
  );
}
