document.addEventListener("DOMContentLoaded", function () {
    const books = [
    {
    title: "Voices of Cairo",
    author: "Salma El-Toukhy",
    released: "May 2025",
    description: "A contemporary novel capturing modern life in Cairo with cultural depth."
    },
    {
    title: "Desert Secrets",
    author: "Hossam El Din",
    released: "April 2025",
    description: "A suspense-filled historical novel set in the heart of the Sahara."
    },
    {
    title: "The Last Manuscript",
    author: "Leila Hassan",
    released: "March 2025",
    description: "A gripping mystery involving a lost ancient book from Andalusia."
    },
    {
    title: "Beyond the Nile",
    author: "Tarek El-Baz",
    released: "February 2025",
    description: "An inspiring journey through Egyptian history, myth, and identity."
    }
    ];
    
    localStorage.setItem("books", JSON.stringify(books));
    console.log("✅ Books saved to localStorage:", books);
    });