import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfTable from "./table/InfTable";
import axios from "axios";
/**
 *  CSS Type
 */

type ContainerProps = {
  height: string;
  width: string;
  background: string;
};

/**
 *  CSS Template
 */

const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: ${(props) => props.background};
`;

/**
 *  CSS Value
 */

const ContentContainer: ContainerProps = {
  height: "95vh",
  width: "100%",
  background: "white",
};

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const ThemeContext = React.createContext(themes.light);

const App: React.FC = () => {
  const [columns, setColumns] = useState([{ name: "", length: 0 }]);
  // Fake Data
  const columnList = [
    { name: "index", length: 5 },
    { name: "transacttime", length: 10 },
    { name: "stocksymbol", length: 5 },
    { name: "clordid", length: 15 },
    { name: "msgtype", length: 5 },
    { name: "orderqty", length: 5 },
    { name: "leavesqty", length: 10 },
    { name: "cumqty", length: 10 },
    { name: "avgpx", length: 10 },
    { name: "lastupdated", length: 10 },
  ];

  const tableName = "fixdata";

  // API Call
  useEffect(() => {
    async function fetchData() {
      // const response = await axios(
      //   `http://localhost:8080/api/getColumnInfo?tableName=${tableName}`
      // );
      // console.log(response);
      // setColumns(response.data.columnList);
    }
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={themes.dark}>
      <div className="App">
        <Container className="App-Content" {...ContentContainer}>
          <InfTable columnList={columnList} />
        </Container>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
