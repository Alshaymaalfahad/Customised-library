export default function CoverImage({ book, glyphClassName = "text-6xl" }) {
  if (book.cover) {
    return (
      <img
        src={book.cover}
        alt={`غلاف كتاب ${book.title}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: book.color }}>
      <span className={`font-serif text-white/90 ${glyphClassName}`}>{book.letter}</span>
    </div>
  );
}
