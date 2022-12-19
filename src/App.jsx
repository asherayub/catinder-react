import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelIcon from "@mui/icons-material/Cancel";

function App() {
  const [imgIndex, setImgIndex] = useState(0);
  const [startPage, setStartPage] = useState(true);
  const [catsData, setCatsData] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [toggleLikedCats, setToggleLikedCats] = useState(false);
  const [likedCats, setLikedCats] = useState([]);
  const url = `https://api.thecatapi.com/v1/images/search?limit=25`;
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
          data
            .map((cat) => {
              if (cat.url.endsWith("jpg"))
                return {
                  catId: nanoid(),
                  catURL: cat.url,
                  isLiked: false,
                };
            })
            .filter((cat) => cat !== undefined)
        )
      );
  }, [startPage]);
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
//  ??ERROR HERE
  useEffect(() => {
    setLikedCats(catsData.filter(cat => cat.isLiked));
  }, [catsData]);
  const dislikedCat = () => {
    setImgIndex((prev) => prev + 1);
  };
  //   timeout for start button, giving it 3 seconds to load the cats from the api
  setTimeout(() => {
    setShowStartBtn(true);
  }, 3000);
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div className="App">
      {startPage ? (
        <div className="start-page">
          <h1>catinder</h1>
          <h2>first cat tinder website for your beloved cat</h2>
          <p>get your cat a partner</p>
          {showStartBtn ? (
            <button onClick={() => setStartPage((prev) => !prev)}>
              Find Meow
            </button>
          ) : (
            <svg className="loader" viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          )}
        </div>
      ) : (
        <div className="main-page">
          {likedCats.length > 0 && (
            <button onClick={setToggleLikedCats((prev) => !prev)}>
              Show Liked Cats
            </button>
          )}
          {/* {likedCat} */}
          <div className="header">
            <h1>find the best match for your cat</h1>
          </div>
          <div className="profile">
            <div className="profile-image">
              <div className="text">Loading</div>
              <img
                id={catsData[imgIndex].catId}
                src={catsData[imgIndex].catURL}
                alt=""
              />
            </div>
            <div className="actions">
              <button className="dislike" onClick={dislikedCat}>
                <CancelIcon className="dislike" />
              </button>
              <button className="like" onClick={likedCat}>
                <FavoriteIcon className="like" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
