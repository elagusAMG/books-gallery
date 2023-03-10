import Head from 'next/head';
import { Inter } from 'next/font/google';
import { createClient } from '@supabase/supabase-js';

import BlurBook, { Book } from '@/components/BlurBook';

const inter = Inter({ subsets: ['latin'] });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

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
        <meta name="description" content="This is a project where I used next/image component and fetched data form Supabase" />
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
