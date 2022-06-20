import React, { useState, useEffect } from "react";
import "./styles.css";
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://random-data-api.com/api/users/random_user?size=10`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>App API Posts</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className="a1">
        {data &&
          data.map(({ id, first_name, last_name, employment, avatar }) => (
            <li key={id}>
              <div className="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src={avatar} alt={first_name} />
                    <h3>
                      {first_name} {last_name}
                    </h3>
                  </div>
                  <div class="flip-card-back">
                    <h1>More Information Here</h1>
                    <h3>Profession :{employment.title}</h3>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}
