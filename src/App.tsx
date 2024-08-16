import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

enum EGENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface IPeople {
  name: {
    first: string;
    last: string;
  };
  cell: string;
  gender: EGENDER;
}

interface IReturnPeople {
  results: IPeople[];
}

const useApp = () => {
  const [data, setData] = useState<Array<IPeople>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    const response = await axios.get<IReturnPeople>(
      `https://randomuser.me/api/?results=20`
    );
    setData(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    data,
    isLoading,
  };
};

const getColorByGender = (gender: EGENDER) => {
  return gender.toUpperCase() === EGENDER.MALE ? "blue" : "red";
};

function App() {
  const { data, isLoading } = useApp();

  return (
    <main>
      <h1>Single responsibility principle</h1>
      {isLoading && <strong>Loading...</strong>}
      {data?.map((item) => {
        return (
          <div key={item.cell}>
            <p style={{ color: getColorByGender(item.gender) }}>
              {item.name.first} {item.name.last}
            </p>
          </div>
        );
      })}
    </main>
  );
}

export default App;
