### Inf-Table
Pure front-end Table component with infinite scrolling.  
>
    Typescript + React + Styled Component + Hooks + React-Virtualized

To run this app
>
    npm start

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


