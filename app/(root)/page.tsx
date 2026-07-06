import React from "react";
import { HeroSection } from "@/components/hero-section";
import { sampleBooks } from "@/lib/constants";
import BookCard from "@/components/BookCard";

const Page = () => {
  return (
    <main className="wrapper container">
      <HeroSection />
      <div className="library-books-grid">
        {sampleBooks.map((book) => (
          <BookCard
            slug={book.slug}
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
          />
        ))}
      </div>
    </main>
  );
};
export default Page;
