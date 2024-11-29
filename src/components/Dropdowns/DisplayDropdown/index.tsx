import React, { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import './displayDropdown.css';
import { LuSettings2 } from 'react-icons/lu';
import { BiChevronDown } from 'react-icons/bi';

function DisplayDropdown({
  grouping,
  setGrouping,
  ordering,
  setOrdering,
}: {
  grouping: string;
  setGrouping: (grouping: string) => void;
  ordering: string;
  setOrdering: (ordering: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') setVisible(false);
    if ((event.key === 'Enter' || event.key === ' ') && componentRef.current?.contains(event.target as Node)) {
      setVisible((prev) => !prev);
    }
  }, []);

  const onGroupingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setGrouping(e.target.value),
    [setGrouping]
  );

  const onOrderingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setOrdering(e.target.value),
    [setOrdering]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <div className="display-dropdown" ref={componentRef}>
      <div className="dropdown-label-container" onClick={toggleDropdown}>
        <LuSettings2 color="#6b6f76" />
        <div className="dropdown-label">Display</div>
        <BiChevronDown color="#6b6f76" />
      </div>
      <div className={`dropdown-content-container ${visible ? 'visible' : ''}`}>
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Grouping</div>
          <select name="grouping" id="grouping" value={grouping} onChange={onGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Ordering</div>
          <select name="ordering" id="ordering" value={ordering} onChange={onOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DisplayDropdown;
