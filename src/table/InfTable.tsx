/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, FunctionComponent } from "react";
import {
  InfiniteLoader,
  Table,
  Index,
  IndexRange,
  Column,
  TableHeaderProps,
  AutoSizer,
  Size
} from "react-virtualized";
import Draggable from "react-draggable";
import "./InfTable.css";
import styled from "styled-components";
import axios from "axios";

// Stype Component CSS
const DragHandleIcon = styled.span`
  flex: 0 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: none !important;
`;

// Props
interface TableProps {
  columnList: {
    name: string;
    length: number;
  }[];
  tableName: string;
}

// Functional Component
const InfTable: FunctionComponent<TableProps> = ({ columnList, tableName }) => {
  function isRowLoaded({ index }: Index) {
    return !!list[index];
  }

  function loadMoreRows({ startIndex, stopIndex }: IndexRange) {
    return new Promise((resolve, reject) => {
      console.log(`Loading from ${stopIndex} to ${stopIndex}`);
      async function fetchData() {
        const response = await axios(
          `http://localhost:8080/api/loadRows?startIndex=${startIndex}&endIndex=${stopIndex}`
        );
        console.log(response);
        let newList = [...list].concat(response.data.data);
        setList(newList);
        resolve();
      }
      fetchData();
    });
  }

  function makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateRow(count: number, len: number) {
    let newList = [];
    for (let i = 0; i < count; i++) {
      let row: { [key: string]: string } = columnList.reduce(
        (pre, cur) =>
          Object.assign(
            {
              [cur.name]: makeid(cur.length)
            },
            pre
          ),
        {}
      );
      newList.push(Object.assign({ index: i + len }, row));
    }
    return newList;
  }

  // Search a column based on user provided string
  function scrollBySearching(columnName: string, searchString: string) {
    let result = list.filter(value =>
      value[columnName].startsWith(searchString)
    );
    console.log(result);
  }

  function nextKey(dataKey: string): string {
    for (let i = 0; i < columnList.length; i++) {
      if (dataKey === columnList[i].name) {
        return columnList[(i + 1) % columnList.length].name;
      }
    }
    return "";
  }

  function rowClassName({ index }: Index) {
    if (index < 0) {
      return "headerRow";
    } else {
      return index % 2 === 0 ? "evenRow" : "oddRow";
    }
  }

  function onRowClick({ index }: Index) {}

  function calculateRatio(
    list: { name: string; length: number }[]
  ): { [key: string]: number } {
    let totalLength = 0;
    for (let i = 0; i < list.length; i++) {
      totalLength += list[i].length;
    }
    let ratioMap = list.reduce(
      (pre, cur) =>
        Object.assign({ [cur.name]: cur.length / totalLength }, pre),
      {}
    );
    return ratioMap;
  }

  function columnHeaderRender({ dataKey, label }: TableHeaderProps) {
    return (
      <React.Fragment key={dataKey}>
        <div
          className="ReactVirtualized__Table__headerTruncatedText"
          key="label"
        >
          {label}
        </div>
        {dataKey === columnList[columnList.length - 1].name ? null : (
          <Draggable
            axis="x"
            defaultClassName="DragHandle"
            position={{ x: 0, y: 0 }}
            onDrag={(e, data) => {
              let deltaRatio = data.deltaX / (screenWidth - 70);
              let newColumnRatio = {
                ...columnRatio,
                [dataKey]: columnRatio[dataKey] + deltaRatio,
                [nextKey(dataKey)]: columnRatio[nextKey(dataKey)] - deltaRatio
              };
              setColumnRatio(newColumnRatio);
            }}
          >
            <DragHandleIcon>:</DragHandleIcon>
          </Draggable>
        )}
      </React.Fragment>
    );
  }

  const [list, setList] = useState<
    ({ index: number } & { [key: string]: string })[]
  >([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [columnRatio, setColumnRatio] = useState(calculateRatio(columnList));
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={1000}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }: Size) => {
            setScreenWidth(width);
            return (
              <div>
                <p>{tableName}</p>
                <Table
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={list.length}
                  rowGetter={({ index }) => list[index]}
                  onRowsRendered={onRowsRendered}
                  onRowClick={onRowClick}
                  rowClassName={rowClassName}
                  headerClassName="headerColumn"
                  ref={registerChild}
                >
                  <Column label="Index" dataKey="index" width={50} />
                  {columnList.map(column => (
                    <Column
                      label={column.name}
                      dataKey={column.name}
                      width={(width - 70) * columnRatio[column.name]}
                      key={column.name}
                      headerRenderer={columnHeaderRender}
                    ></Column>
                  ))}
                </Table>
              </div>
            );
          }}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default InfTable;
