
import React, { Children, FunctionComponent, ObjectHTMLAttributes } from "react";
import './JsonTable.css'

const json_data = {
  "id": "0001",
  "type": "donut",
  "name": "Cake",
  "ppu": 0.55,
  "batters":
  {
    "batter":
      [
        { "id": "1001", "type": "Regular" },
        { "id": "1001", "type": "Regular" },
        { "id": "1002", "type": "Chocolate" },
        { "id": "1003", "type": "Blueberry" },
        { "id": "1004", "type": "Devil's Food" }
      ]
  },
  "topping":
    [
      { "id": "5001", "type": "None" },
      { "id": "5002", "type": "Glazed" },
      { "id": "5005", "type": "Sugar" },
      { "id": "5007", "type": "Powdered Sugar" },
      { "id": "5006", "type": "Chocolate with Sprinkles" },
      { "id": "5003", "type": "Chocolate" },
      { "id": "5004", "type": "Maple" }
    ]
}
const data =
{
  name: 'Jim',
  age: 18,
  courses: [
    {
      title: 'English', score: 87, extra: {
        key1: 'value1',
        key2: [
          {
            id: 123,
            name: 'test1'
          },
          {
            id: 123,
            name: 'test1'
          }, {
            id: 123,
            name: 'test1',
            extra: [1, 2, 3, { k: 'v' }]
          },
        ]
      }
    },
    { title: 'Chinese', score: 67, extra1: [123, 456, 789] }
  ]
}

const long = {
  key: 'value1',
  key1: 'value1',
  key2: 'value1',
  key3: 'value1',
  key4: 'value1',
  key5: 'value1',
  key6: 'value1',
  key7: 'value1',
}

const row1 = [
  {
    key1: 'value1',
    key2: 'value2',

  },
  {
    key1: 'value1',
    key2: 'value2',

  },
  {
    key1: 'value1',
    key2: 'value2',
    arr: [1, 2, 3]
  },
]

const isPrimitive = (element: any) => {
  let flag = true
  for (let e of element) {
    flag = flag && (e !== Object(e))
  }
  return flag
}

const isPrimitiveElement = (e: any) => {
  return (e !== Object(e))
}

// get all the key of a object list
const getKeys = (arr: any) => {
  let s = new Set()
  for (const e of arr) {
    if (!isPrimitiveElement(e))
      for (const key of Object.keys(e)) {
        s.add(key)
      }
  }
  return s
}

// Make sure each object in the arr has key in set keys
const matchWithKeys = (arr: any, keys: Set<unknown>) => {
  for (let element of arr) {
    for (let key of keys) {
      if (!element.hasOwnProperty(key)) {
        element = Object.assign(element, { [key as string]: null })
      } else {
        element = Object.assign(element)
      }
    }
  }
  return arr
}

// console.log(matchWithKeys(row1, getKeys(row1)))



const JsonTable: FunctionComponent<any> = () => {

  const renderElement = (element: any) => {
    let child
    if (isPrimitiveElement(element)) {
      child = <td key={element}>{element}</td>
    }
    else {
      if (Array.isArray(element)) {
        matchWithKeys(element, getKeys(element))
        child = <td key={getKeys(element).keys.toString()}>{renderRowVertical(element)}</td>
      }
      else {
        child = renderObject(element)
      }
    }
    return child
  }

  const renderObject = (element: any) => {
    let keys = Object.keys(element)
    let values = Object.values(element)
    return <td key={element}>
      {
        renderTable(<React.Fragment>
          <tr className="tr_columns">{renderRowHorizontal(keys)}</tr>
          <tr>{renderRowHorizontal(values)}</tr>
        </React.Fragment>)
      }
    </td>
  }

  const renderTable = (child: any) => {
    return <table>
      <tbody>
        {child}
      </tbody>
    </table>
  }

  const renderRowHorizontal = (row: any) => {
    return row.map((element: any) => renderElement(element))
  }

  const renderRowVertical = (row: any) => {
    let columns = []
    for (let key of getKeys(row)) {
      columns.push(<td key={key as string}>{key as string}</td>)
    }
    let rows = []
    let idx = 0
    for (let element of row) {
      if (isPrimitiveElement(element)) {
        rows.push(<tr key={element}>{renderElement(element)}</tr>)
      }
      else {
        let values = []
        for (let key of getKeys(row)) {
          values.push(element[key as string])
        }
        rows.push(<tr key={element + idx}>{renderRowHorizontal(values)}</tr>)
      }
      idx += 1
    }
    return renderTable(<React.Fragment>
      <tr className="tr_columns">{columns}</tr>
      {rows}
    </React.Fragment>)
  }


  return <React.Fragment>
    {/* {JsonToTable(data, 'vertical')} */}
    {
      <table>
        <tbody>
          <tr>
            {renderElement(json_data)}
            {/* {renderRowOfSameObject(row1)} */}
          </tr>
        </tbody>
      </table>
    }
  </React.Fragment>
}

export default JsonTable