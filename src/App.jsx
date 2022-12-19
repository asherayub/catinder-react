import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

function App() {
  const [imgIndex, setImgIndex] = useState(0);
  const [startPage, setStartPage] = useState(true);
  const [catsData, setCatsData] = useState([]);
  const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
  const apikey = `live_dFOz5iCPFIa699Xc8c5Xf4hqJY7ShdMpJFMtbtil1paEI8IUeueHw6whElfUoOIV`;
  useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key": apikey,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setCatsData(
          data.map((cat) => {
            return {
              catId: nanoid(),
              catURL: cat.url,
              isLiked: false,
            };
          })
        )
      );
  }, [startPage]);
  console.table(catsData);
  const likedCat = () => {
    setCatsData((prev) => {
      return prev.map((cat) => {
        if (cat.catId === catsData[imgIndex].catId) {
          return {
            ...cat,
            isLiked: true,
          };
        } else return cat;
      });
    });
    setImgIndex((prev) => prev + 1);
  };

  return (
    <div className="App">
      {startPage ? (
        <div className="start-page">
          <h1>catinder</h1>
          <h2>first cat tinder website for your beloved cat</h2>
          <p>get your cat a partner</p>
          <button onClick={() => setStartPage((prev) => !prev)}>
            Find Meow
          </button>
        </div>
      ) : (
        <div className="main-page">
          <div className="profile">
            <div className="profile-image">
              <img
                id={catsData[imgIndex].catId}
                src={catsData[imgIndex].catURL}
                alt=""
              />
            </div>
            <div className="actions">
              <button className="dislike">Dislike</button>
              <button className="like" onClick={likedCat}>
                Like
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
