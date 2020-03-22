import React from "react";
import styled from "styled-components";
import InfTable from "./table/InfTable";

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
  return (
    <div className="App">
      <Container className="App-Content" {...ContentContainer}>
        <InfTable />
      </Container>
    </div>
  );
};

export default App;
