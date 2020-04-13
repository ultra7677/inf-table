### Inf-Table

Pure front-end Table component with infinite scrolling.

>

    Typescript + React + Styled Component + Hooks + React-Virtualized

To run this app

>

    npm start

### Why Typescript

### Why Hooks

- Classes are hard for humans/machines
- Reusing logic
  - Higher-order components
  - Render props
- Giant components
  - componentDidMount/WillMount

useState is a hook. a function provided by React to access React component's state

### Why Styled Component

Back End API:

#### getColumnInfo

[HTTP Get]
Request:

    one parameter, tableName
    .../api/getColumnInfo?tableName=XXX

Response:

>

    {
        columnList : [
            {
                name: string, // Name of the Column
                length: int, // Characters you expected for this Column
            }
            ...
        ]
    }

#### loadRows

[HTTP Get]
Request:

    two parameters, startIndex and endIndex
    .../api/loadRows?startIndex=0&endIndex=10

Response:

    columnName is the name defined in getColumnInfo
    provide data as a list
    {
        data: [
            {
                index: int,
                [columnName]: string
            }
            ...
        ]
    }
