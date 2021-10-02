import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import "./home.css";
import { Input } from "antd";
import { StarOutlined } from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const mystyle = {
  width: "50%",
  height: "30%",
  margin: "25px",
};
const { Search } = Input;
const Home = () => {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  const [title, setTitle] = useState("");

  // You can also pass an optional settings object
  // below listed default settings

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await axios.get(
          "https://api.jikan.moe/v3/search/anime?q=&order_by=score&sort=desc&page=1&limit=100"
        );
        setData(fetchedData.data.results);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    AOS.init({
      duration: 500, // values from 0 to 3000, with step 50ms
    });
  }, []);

  async function onSearch(e) {
    setTitle(e);
    const fetchedData = await axios.get(
      `https://api.jikan.moe/v3/search/anime?q=${e}`
    );
    setNewData(fetchedData.data.results);
    console.log(newData);
  }

  function capitalizeFirstLetter(string) {
    var splitStr = string.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  if (!data.length) {
    return <p>Loading...</p>;
  } else if (newData.length) {
    return (
      <div className="main-container">
        <Search
          placeholder="Search an Anime..."
          onSearch={onSearch}
          enterButton
          style={mystyle}
        />
        ;<Typography.Title>{capitalizeFirstLetter(title)}</Typography.Title>
        <div className="card-container">
          <Row gutter={[0, 32]} justify="space-around">
            {newData.map((item) => (
              <Card
                data-aos="flip-down"
                className="card"
                style={{
                  width: "27%",
                  backgroundColor: "#ffe8d6",
                  color: "#cb997e",
                }}
                title={item.title}
                extra={
                  <img
                    src={item.image_url}
                    className="image4"
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                }
                hoverable
              >
                <p>
                  Score: {item.score} <StarOutlined />
                </p>
                <p>
                  Episodes: {item.episodes}, {item.type}
                </p>
                <p>Description: {item.synopsis}</p>
                <a href={item.url}>See More</a>
              </Card>
            ))}
          </Row>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <Search
          placeholder="Search an Anime..."
          onSearch={onSearch}
          enterButton
          style={mystyle}
        />
        ;<Typography.Title>Top 100 Animes(MAL)</Typography.Title>
        <div className="card-container">
          <Row gutter={[0, 32]} justify="space-around">
            {data.map((item) => (
              <Card
                data-aos="flip-down"
                className="card"
                style={{
                  width: "27%",
                  backgroundColor: "#ffe8d6",
                  color: "#cb997e",
                }}
                title={item.title}
                extra={
                  <img
                    src={item.image_url}
                    className="image4"
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                }
                hoverable
              >
                <p>
                  Score: {item.score} <StarOutlined />
                </p>
                <p>
                  Episodes: {item.episodes}, {item.type}
                </p>
                <p>Description: {item.synopsis}</p>
                <a href={item.url}>See More</a>
              </Card>
            ))}
          </Row>
        </div>
      </div>
    );
  }
};
export default Home;
