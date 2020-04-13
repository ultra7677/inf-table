/* eslint-disable no-restricted-globals */
import React, { useState, FunctionComponent, useContext } from "react";
import {
  InfiniteLoader,
  Table,
  Index,
  IndexRange,
  Column,
  TableHeaderProps,
} from "react-virtualized";
import Draggable from "react-draggable";
import "./InfTable.css";
import styled from "styled-components";
import axios from "axios";
import { ThemeContext } from "../App";
import useScreenWidth from "../shared/UseScreenWidth";

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
}

// Functional Component
const InfTable: FunctionComponent<TableProps> = ({ columnList }) => {
  const [list, setList] = useState<{ [key: string]: string | number }[]>([
    {
      index: 0,
      transacttime: 1584399800544,
      stocksymbol: "FB",
      clordid: "cf1b21c7-8400-46e5-83e1-98b01b6164e4",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 1007,
      cumqty: 7653,
      avgpx: 0.062626004,
      lastupdated: 1584399841234,
    },
    {
      index: 1,
      transacttime: 1584399800547,
      stocksymbol: "FB",
      clordid: "333da9bc-84c4-44e9-9cb0-cd3d81a30360",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 658,
      cumqty: 4887,
      avgpx: 0.4327389,
      lastupdated: 1584399841240,
    },
    {
      index: 2,
      transacttime: 1584399800551,
      stocksymbol: "TWTR",
      clordid: "76bfd7a9-d5fd-404d-a641-aae8f150fcae",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 2635,
      cumqty: 7056,
      avgpx: 0.065520406,
      lastupdated: 1584399841243,
    },
    {
      index: 3,
      transacttime: 1584399800559,
      stocksymbol: "TWTR",
      clordid: "2c004c54-bfee-4185-a320-6fb84340ebc6",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 0,
      cumqty: 7042,
      avgpx: 0.30234587,
      lastupdated: 1584399841249,
    },
    {
      index: 4,
      transacttime: 1584399800561,
      stocksymbol: "AMZN",
      clordid: "c6abd36d-73b2-4494-af88-e70ab98a9e2c",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 0,
      cumqty: 6806,
      avgpx: 0.49420387,
      lastupdated: 1584399841362,
    },
    {
      index: 5,
      transacttime: 1584399800563,
      stocksymbol: "TWTR",
      clordid: "03a7c0ed-49aa-43d6-82ec-f670f4eb274e",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 1475,
      cumqty: 6709,
      avgpx: 0.30738932,
      lastupdated: 1584399841364,
    },
    {
      index: 6,
      transacttime: 1584399800565,
      stocksymbol: "FB",
      clordid: "333da9bc-84c4-44e9-9cb0-cd3d81a30360",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 63,
      cumqty: 5482,
      avgpx: 0.6381086,
      lastupdated: 1584399841366,
    },
    {
      index: 7,
      transacttime: 1584399800566,
      stocksymbol: "FB",
      clordid: "446b0d0c-8289-4162-9d5b-7f1a1b24b0cd",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 3216,
      cumqty: 3031,
      avgpx: 0.43784744,
      lastupdated: 1584399841368,
    },
    {
      index: 8,
      transacttime: 1584399800568,
      stocksymbol: "AMZN",
      clordid: "1ad2a1e5-b6fc-494c-93f6-ddaa1c2b6bf5",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 853,
      cumqty: 7477,
      avgpx: 0.7355623,
      lastupdated: 1584399841369,
    },
    {
      index: 9,
      transacttime: 1584399800570,
      stocksymbol: "FB",
      clordid: "c7e5b900-2213-4733-b749-131dc8fbf0fb",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 50,
      cumqty: 1686,
      avgpx: 0.37654465,
      lastupdated: 1584399841370,
    },
    {
      index: 10,
      transacttime: 1584399800578,
      stocksymbol: "FB",
      clordid: "c7e5b900-2213-4733-b749-131dc8fbf0fb",
      msgtype: "8",
      orderqty: 0,
      leavesqty: 0,
      cumqty: 1736,
      avgpx: 0.8777325,
      lastupdated: 1584399841377,
    },
  ]);
  const [columnRatio, setColumnRatio] = useState(calculateRatio(columnList));
  let screenWidth = useScreenWidth();

  function isRowLoaded({ index }: Index) {
    return !!list[index];
  }

  function loadMoreRows({ startIndex, stopIndex }: IndexRange) {
    return new Promise((resolve, reject) => {
      resolve();
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
              [cur.name]: makeid(cur.length),
            },
            pre
          ),
        {}
      );
      newList.push(Object.assign({ index: i + len }, row));
    }
    return newList;
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
              let deltaRatio = data.deltaX / (screenWidth - 80);
              let newColumnRatio = {
                ...columnRatio,
                [dataKey]: columnRatio[dataKey] + deltaRatio,
                [nextKey(dataKey)]: columnRatio[nextKey(dataKey)] - deltaRatio,
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

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={1000}
    >
      {({ onRowsRendered, registerChild }) => (
        <div>
          <Table
            width={screenWidth - 10}
            height={window.innerHeight - 10}
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
            {columnList.map((column) => (
              <Column
                label={column.name}
                dataKey={column.name}
                width={(screenWidth - 80) * columnRatio[column.name]}
                key={column.name}
                headerRenderer={columnHeaderRender}
              ></Column>
            ))}
          </Table>
        </div>
      )}
    </InfiniteLoader>
  );
};

export default InfTable;
