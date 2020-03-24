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
  height: ${props => props.height};
  width: ${props => props.width};
  background: ${props => props.background};
`;

/**
 *  CSS Value
 */

const ContentContainer: ContainerProps = {
  height: "95vh",
  width: "100%",
  background: "white"
};

const App: React.FC = () => {
  const [columns, setColumns] = useState([{ name: "", length: 0 }]);
  // Fake Data
  const columnList = [
    { name: "column1", length: 30 },
    { name: "column2", length: 40 },
    { name: "column3", length: 100 },
    { name: "column4", length: 20 },
    { name: "column5", length: 20 }
  ];

  const tableName = "fixdata";

  // API Call
  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        `http://localhost:8080/api/getColumnInfo?tableName=${tableName}`
      );
      console.log(response);
      setColumns(response.data.columnList);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Container className="App-Content" {...ContentContainer}>
        <InfTable columnList={columns} tableName={tableName} />
      </Container>
    </div>
  );
};

export default App;
