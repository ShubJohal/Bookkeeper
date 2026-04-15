// Use API to fetch book cover from Open Library Covers API

export async function getBookCover(title, author) {
  const apiURL = "https://openlibrary.org";

  try {
    const params = new URLSearchParams({ title, author });
    const response = await fetch(`${apiURL}/search.json?${params.toString()}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const firstBook = data.docs[0];

    if (firstBook && firstBook.cover_i) {
      const coverUrl = `https://covers.openlibrary.org/b/id/${firstBook.cover_i}-L.jpg`;
      return coverUrl;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
