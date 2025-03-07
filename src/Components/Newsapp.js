import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const API_KEY = "5c5288f5f81c46b492b8a1b469c4a530";

  const getData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search} AND india&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    let dt = jsonData.articles.slice(0, 10);
    setNewsData(dt);
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="news-app">
      <nav
        style={{ backgroundColor: "black", color: "yellow", padding: "15px" }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            WORLD<span style={{ color: "red" }}>NOW</span>
          </h1>
        </div>

        <ul style={{ display: "flex", gap: "15px" }}>
          <li>
            <a style={{ fontWeight: 600, fontSize: "17px", color: "yellow" }}>
              Read it.. to know it....
            </a>
          </li>
          <li>
            <a style={{ fontWeight: 600, fontSize: "17px", color: "yellow" }}>
              Think deeper.
            </a>
          </li>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
            style={{ padding: "5px", borderRadius: "25px" }}
          />
          <button
            onClick={getData}
            style={{
              marginLeft: "10px",
              backgroundColor: "yellow",
              color: "black",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </nav>

      <div
        className="categoryBtn"
        style={{ backgroundColor: "black", padding: "10px" }}
      >
        {[
          "Hot picks",
          "Business",
          "Sports",
          "Politics",
          "Entertainment",
          "Health",
          "Fitness",
        ].map((category) => (
          <button
            key={category}
            onClick={() => {
              setSearch(category.toLowerCase());
              getData();
            }}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "yellow",
              color: "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "25px",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div>{newsData ? <Card data={newsData} /> : null}</div>

      <footer
        className="professional-footer"
        style={{
          backgroundColor: "black",
          color: "yellow",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="footer-content">
          <div className="footer-section about">
            <h3>
              About <span style={{ color: "red" }}>World Now</span>
            </h3>
            <p>
              World Now News brings you the latest trending news from around the
              world. Stay informed and updated with us.
            </p>
          </div>

          <div className="footer-section subscribe">
            <h3>Subscribe</h3>
            <p>Get the latest news delivered to your inbox.</p>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{ padding: "5px", borderRadius: "5px" }}
              />
              <button
                type="submit"
                style={{
                  marginLeft: "10px",
                  backgroundColor: "yellow",
                  color: "black",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="subscription-message" style={{ color: "red" }}>
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 <span style={{ color: "red" }}>World Now</span>. All
            Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Newsapp;
