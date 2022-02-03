import React, { useState } from "react";

function Tweet(tweet) {
  console.log(tweet);
  return (
    <div class="tweet-wrap">
      <div class="tweet-header">
        <div class="tweet-header-info">
          {tweet.tweet.user} <span>@{tweet.tweet.user}</span>
          <span>. {tweet.tweet.date}</span>
          <p>{tweet.tweet.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function Slider(props) {

    const [loadingTweets, setLoadingTweets] = useState(false);

  async function handleClick(city) {
    const url = "http://localhost:4000/cities/";

    setLoadingTweets(true);
    
    await fetch(url.concat(city))
      .then(res => res.json())
      .then(result => props.setTweetsResult(result.tweets))
      .then(console.log("done"));

    setLoadingTweets(false);
  }

  return (
    <div id="slider">
        {loadingTweets ? <div id="loadBox">Chargement en cours ... <div class="loader"></div></div> : <div>
      <h4 id="titreTweets">Vous pouvez voir toutes les tweets :</h4>
      {props.selectedCity
        ? props.tweetsResult
          ? props.tweetsResult.map(tweet => <Tweet tweet={tweet} />)
          : <button
              id="tweetsButton"
              onClick={() => handleClick(props.selectedCity.name)}
            >
              Voir les tweets dans {props.selectedCity.name}
            </button>
        : <p id="villeMsg">Veuillez chercher un sujet et selectionner une ville !</p>}</div>}
    </div>
  );
}
