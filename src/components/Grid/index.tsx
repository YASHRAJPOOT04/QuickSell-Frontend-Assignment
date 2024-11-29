import React from 'react';
import './grid.css';
import Column from '../Column/Column';
import { Ticket, User } from '../../interfaces';

interface GridProps {
  gridData: Record<string, Ticket[]>;
  grouping: string;
  userIdToData: Record<string, User>;
}

function Grid({ gridData, grouping, userIdToData }: GridProps) {
  const keys = Object.keys(gridData);

  // Fallback UI for empty data
  if (!keys.length) {
    return <div className="grid-empty">No data available to display.</div>;
  }

  return (
    <div className="grid">
      {keys.map((key) => (
        <Column
          key={key}
          tickets={gridData[key]}
          grouping={grouping}
          groupBy={key}
          userIdToData={userIdToData}
        />
      ))}
    </div>
  );
}

export default Grid;
