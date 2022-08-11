(function () {
  let bookConnection;
  document.addEventListener("DOMContentLoaded", init);

  const tracker = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await bookConnection();
      }
    });
  });
  async function init() {
    bookConnection = new newBookRequest(1);
    await bookConnection();
  }

  function updateDom(data) {
    const container = document.querySelector(".container");
    data.map((data) => {
      const item = document.createElement("div");
      item.classList.add("hello");
      item.innerText = data.title;
      container.append(item);
    });
    if (tracker) tracker.disconnect();
    tracker.observe(container.lastChild);
  }

  function newBookRequest(page) {
    this.currentPage = page;
    this.query = "The lord of ring";

    const getBooks = async () => {
      this.currentPage++;
      return await fetch(
        "http://openlibrary.org/search.json?" +
          new URLSearchParams({ q: this.query, page: this.currentPage })
      )
        .then((data) => data.json())
        .then((data) => {
          return updateDom(data.docs);
        });
    };
    return getBooks;
  }
})();
