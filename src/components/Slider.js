import React, { useState } from "react";
import axios from 'axios';


function clickHandle(tweet) {
  console.log(tweet);
  axios.get("http://localhost:8081/tweets/").then((response)=>console.log(response));

  axios.post("http://localhost:8081/tweets/save",
  {
    id: tweet.id,
    date: tweet.datestamp,
    tweet_contenu: tweet.tweet,
    city: tweet.near,
    user: tweet.username
},{
    headers: {
      'Accept': '*/*',
       'Content-Type': 'application/json'
    }}).then(response => console.log(response));
  
}


function Tweet(tweet) {
  return (
    <div class="tweet-wrap">
      <div class="tweet-header">
        <div class="tweet-header-info">
          {tweet.tweet.name} <span>@{tweet.tweet.username}</span>
          <span>. {tweet.tweet.datestamp}</span>
          <button id="btnTweet" onClick={() => clickHandle(tweet.tweet)}>Ajouter au favoris</button>
        </div>
        <p>
          {tweet.tweet.tweet}
        </p>
      </div>
    </div>
  );
}

export default function Slider(props) {

    const [loadingTweets, setLoadingTweets] = useState(false);

  async function handleClick(city) {
    const url = "http://localhost:9000/tweets/";
  
    setLoadingTweets(true);
    console.log(url.concat(city.name).concat('?topic=').concat(props.searchTopic).concat('&limit=').concat(city.count));
    await fetch(url.concat(city.name).concat('?topic=').concat(props.searchTopic).concat('&limit=').concat(city.count))
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
          ? props.tweetsResult.map(tweet => <Tweet tweet={tweet}  />)
          : <button
              id="tweetsButton"
              onClick={() => handleClick(props.selectedCity)}
            >
              Voir les tweets dans {props.selectedCity.name}
            </button>
        : <p id="villeMsg">Veuillez chercher un sujet et selectionner une ville !</p>}</div>}
    </div>
  );
}
