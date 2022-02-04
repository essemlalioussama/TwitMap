import React, { useState } from "react";
import axios from "axios";
import cities from "../properties.json";

function clickHandle(tweet) {
  console.log(tweet);
  axios
    .get("http://localhost:8081/tweets/")
    .then(response => console.log(response));

  axios
    .post(
      "http://localhost:8081/tweets/save",
      {
        id: tweet.id,
        date: tweet.datestamp,
        tweet_contenu: tweet.tweet,
        city: tweet.near,
        user: tweet.username
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => console.log(response));
}

export default function Slider(props) {
  const [loadingTweets, setLoadingTweets] = useState(false);
  const [favorisTweets, setFavorisTweets] = useState(null);


  function Tweet(tweet) {
    return (
      <div class="tweet-wrap">
        <div class="tweet-header">
          <div class="tweet-header-info">
            {tweet.tweet.name} <span>@{tweet.tweet.username}</span>
            <span>. {tweet.tweet.datestamp}</span>
            <button id="btnTweet" onClick={() => clickHandle(tweet.tweet)}>
              Ajouter au favoris
            </button>
          </div>
          <p>
            {tweet.tweet.tweet}
          </p>
        </div>
      </div>
    );
  }
  
  function TweetFavoris(tweet) {
    console.log(tweet);
    return (
      <div class="tweet-wrap">
        <div class="tweet-header">
          <div class="tweet-header-info">
            {tweet.tweet.name} <span>@{tweet.tweet.user}</span>
            <span> {tweet.tweet.date}</span>
            <button id="btnTweet" onClick={() => clickHandleFavoris(tweet.tweet.city)}>
              Afficher sur la carte
            </button>
          </div>
          <p>
            {tweet.tweet.tweet_contenu}
          </p>
        </div>
      </div>
    );
  }


  async function handleClick(city) {
    const url = "http://localhost:9000/tweets/";

    setLoadingTweets(true);
    console.log(
      url
        .concat(city.name)
        .concat("?topic=")
        .concat(props.searchTopic)
        .concat("&limit=")
        .concat(city.count)
    );
    await fetch(
      url
        .concat(city.name)
        .concat("?topic=")
        .concat(props.searchTopic)
        .concat("&limit=")
        .concat(city.count)
    )
      .then(res => res.json())
      .then(result => props.setTweetsResult(result.tweets))
      .then(console.log("done"));

    setLoadingTweets(false);
  }

  async function loadFavoris(){
    props.setFavorisMode(true);
    setLoadingTweets(true);
    await axios.get("http://localhost:8081/tweets/").then((res)=> {
      if(res.data.size!=0)setFavorisTweets(res.data)}).then(setLoadingTweets(false));
  }

  function clickHandleFavoris(city){
    cities.forEach((entry) => {if(entry.name.toUpperCase() === city.toUpperCase()) props.setMarkerCoordinates(entry)});
  }

  return (
    <div id="slider">
      {props.favorisMode
        ? <div>
            <button id="rechercheBtn" onClick={() => props.setFavorisMode(false)}>
              Rechercher des tweets
            </button>
            <button id="favorisBtn" onClick={() => loadFavoris()}>
              Afficher mes tweets favoris
            </button>
            <div>
              { loadingTweets ? <div id="loadBox">
                Chargement en cours ... <div class="loader" />
              </div> : <div>
                  <h4 id="titreTweets">Vos tweets préférés :</h4>
                  {favorisTweets
                    ? favorisTweets.map(tweet => <TweetFavoris tweet={tweet} />) : <p id="villeMsg">
                    Votre liste est vide, pensez à ajouter vos favoris ! 
                  </p> } </div> }
            </div>
          </div>
        : <div>
            <div>
              <div>
                <button id="favorisBtn" onClick={() => loadFavoris()}>
                  Afficher mes tweets favoris
                </button>
                <button id="rechercheBtn" onClick={() => props.setFavorisMode(false)}>
                  Rechercher des tweets
                </button>
              </div>
            </div>
            {loadingTweets
              ? <div id="loadBox">
                  Chargement en cours ... <div class="loader" />
                </div>
              : <div>
                  <h4 id="titreTweets">Vous pouvez voir toutes les tweets :</h4>
                  {props.selectedCity
                    ? props.tweetsResult
                      ? props.tweetsResult.map(tweet => <Tweet tweet={tweet} />)
                      : <button
                          id="tweetsButton"
                          onClick={() => handleClick(props.selectedCity)}
                        >
                          Voir les tweets dans {props.selectedCity.name}
                        </button>
                    : <p id="villeMsg">
                        Veuillez chercher un sujet et selectionner une ville !
                      </p>}
                </div>}
          </div>}
    </div>
  );
}
