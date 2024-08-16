import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=20`);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);


  return (
    <main>
      <h1>Single responsibility principle</h1>
      {isLoading && <strong>Loading...</strong>}
      {data?.results?.map((item) => {
        return (
          <div key={item.cell}>
              <p
                style={{color: item.gender === 'male' ? 'blue' : 'red'}}
              >{item.name.first} {item.name.last}</p>
          </div>
        )
      })}
    </main>
  );
}

export default App;
