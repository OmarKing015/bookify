import { BookCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ slug, title, author, coverURL }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="flex flex-col gap-2">
      <article className="book-card">
        <figure className="book-card-figuer">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              width={133}
              height={200}
              className="book-card-cover"
            />
          </div>
        </figure>
        <figcaption className="book-card-meta">
          <h2 className="book-card-title">{title}</h2>
          <p className="book-card-author">{author}</p>
        </figcaption>
      </article>
    </Link>
  );
};

export default BookCard;
