const axios = require("axios");

// Google books api
getBookInfoAPI = async (searchQuery = null) => {
  /*const endPoint =
    "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=" +
    searchQuery.title +
    "+inauthor:" +
    searchQuery.author +
    "&maxResults=1&fields=items(volumeInfo/title,volumeInfo/authors,volumeInfo/averageRating,volumeInfo/imageLinks/thumbnail,volumeInfo/infoLink,volumeInfo/previewLink)&key=AIzaSyC8N4DHQxyY5OtJmkrOFfzx_ykcK93oppI";
  */

  const endPoint =
    "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=" +
    searchQuery.title +
    "+inauthor:" +
    searchQuery.author +
    "&maxResults=1&fields=items(volumeInfo/averageRating)&key=AIzaSyC8N4DHQxyY5OtJmkrOFfzx_ykcK93oppI";
  try {
    // Get request
    console.log(endPoint);
    var res = await axios.get(endPoint, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    });

    if (res.data) {
      return res.data.items[0].volumeInfo;
    } else {
      return null;
    }
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

module.exports = getBookInfoAPI;
