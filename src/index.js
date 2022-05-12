import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import './index.sass'



const getDemoData = (numRows, numCols) => {
  const result = [];
  for (var rowId = 0; rowId < numRows; rowId++) {
    const rowData = {};
    for (var colId = 0; colId < numCols; colId++) {
      rowData[`col${colId}`] = `val${rowId}x${colId}`;
    }
    result.push({
      key: `row${rowId}`,
      data: rowData
    });
  }
  return result;
};



const App = () => {
  const [rowCount, setRowCount] = useState(5);
  const [scrollHeight, setScrollHeight] = useState("400px");

  const value = useMemo(() => getDemoData(rowCount || 1, 10), [rowCount]);
  const columns = useMemo(() => (value ? Object.keys(value[0].data) : []), [value]);

  return (
    <>
        <div className="row">
          Rows
          <InputNumber 
            min={1} 
            max={100} 
            value={rowCount} 
            onChange={(e) => setRowCount(e.value)}
            showButtons={true}
          />
        </div>
        <div className="row">
          Scroll height
          <InputText
            value={scrollHeight}
            onChange={(e) => setScrollHeight(e.value)}
          />
        </div>
      <main>
        <TreeTable
          value={value}
          responsive="true"
          scrollHeight={scrollHeight}
          scrollable="true"
          resizableColumns="true"
          columnResizeMode="expand"
        >
          {columns &&
            columns.map((name) => (
              <Column
                key={name}
                field={name}
                header={name}
                style={{ width: 100 }}
              />
            ))}
        </TreeTable>
      </main>
    </>
  )

}


document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  )
})
