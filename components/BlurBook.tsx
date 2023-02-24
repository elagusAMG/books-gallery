import Image from 'next/image';
import { useState } from 'react';

export type Book = {
  id: number;
  name: string;
  publisher: string;
  href: string;
  imageSrc: string;
};

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

export default BlurBook;