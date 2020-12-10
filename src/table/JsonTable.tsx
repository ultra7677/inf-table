import { type } from "os";
import React, { FunctionComponent } from "react";
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
            { "id": "1001", "type": "Regular", "test": "test", "arr": ["123", "456", "789"] },
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
  const data = [
    {
      name: 'Jim',
      age: 18,
      courses: [
        { title: 'English', score: 87 },
        { title: 'Chinese', score: 67 }
      ]
    },
    {
      name: 'Lucy',
      age: 17,
      courses: [
        { title: 'Math', score: 97 },
        { title: 'Music', score: 77 },
        { title: 'Gym', score: 57 }
      ]
    }
  ]

const isPrimitive = (arr: any) => {
  let flag = true
  for (let element of arr) {
    flag = flag && (element !== Object(element))  
  }
  return flag
} 
  
const JsonTable: FunctionComponent<any> = () => {

    const JSONToHTMLTable = (props:any) => {
        const { data, wrapperClassName, tableClassName } = props
        return (
          <div className={wrapperClassName}>
            <table className={tableClassName}>
              <tbody>
                {Object.keys(data).map((k) => (
                  <tr key={k}>
                    {!Array.isArray(data)
                      && <td>{k.replace(/_/g, ' ')}</td>}
                    {(() => {
                      if (data[k] && typeof data[k] === 'object') {
                        return (
                          <td>
                            <JSONToHTMLTable data={data[k]} tableClassName={tableClassName} />
                          </td>
                        )
                      }
                      return (
                        <td>
                          <span dangerouslySetInnerHTML={{ __html: data[k] }} />
                        </td>
                      )
                    })()}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
    
    const ArrayToTable = (data: any, flag = false) => {
      // // Assume objects in the array are same shape
      if (flag) {
        const proto_object = data[0]
        if (typeof proto_object === 'object') {
          const keys = Object.keys(proto_object)
          const values = data.map((item: any) => 
            <tr>
              {JsonToTable(Object.values(item), true)}
            </tr>
          )
          return (
            <React.Fragment>
              <tr>
                {keys.map(key => <td>{key}</td>)}
              </tr>
              {values}
            </React.Fragment>
          )  
        } else {
          return data.map((item:any) => <td>{item}</td>)
        }
      }
      else {
        console.log(data, isPrimitive(data))
        if (isPrimitive(data)) {
          return data.map((item:any) => <tr> <td>{item}</td> </tr>)
        }
        else {
          return data.map((item:any) => <tr> <td>{JsonToTable(item)}</td> </tr>)
        }
      }
    }


    
    const JsonToTable = (data: any, flag = false) => {
      if (Array.isArray(data)) {
        return ArrayToTable(data, flag)
      }
      else {
        const columns = Object.keys(data).map(key => (<td key={key}>{key}</td>))
        const rows = Object.keys(data).map((key:any) => {
            if (typeof data[key] === 'object') {
              if (Array.isArray(data[key])) {
                return <td>{ ArrayToTable(data[key], flag)}</td>
              }
              else{
                return <td key={`${key}_v`}>{JsonToTable(data[key], flag)}</td>
              }
            }
            else {
              return <td key={`${key}_v`}>{data[key]}</td>
            }
          }
        )
        return <React.Fragment>
                <tr className="tr_columns">
                  {columns}
                </tr>
                <tr>
                  {rows}
                </tr>
              </React.Fragment>
      } 
    }

    return <div>
       <p> Vertical </p>
        <JSONToHTMLTable data={json_data} tableClassName="table table-sm" />
        <p> Horizontal </p>
        <table>
          <tbody>
            {JsonToTable(json_data)}
            {/* {JsonToTable(data)} */}
          </tbody>
        </table>
        <p> Horizontal with Same Shape Object in Array </p>
        <table>
          <tbody>
            {JsonToTable(json_data, true)}
            {/* {JsonToTable(data)} */}
          </tbody>
        </table>
    </div>
}

export default JsonTable