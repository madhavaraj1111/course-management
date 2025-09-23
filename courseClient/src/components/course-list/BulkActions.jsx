import React from 'react';
import Checkbox from '../CheckBox';
import Button from '../Button';

const BulkActions = ({
  selectedCount,
  totalCount,
  isAllSelected,
  onToggleSelectAll,
  onDeleteSelected
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Checkbox
        label="Select All"
        checked={isAllSelected && totalCount > 0}
        onChange={onToggleSelectAll}
      />

      <div className="h-10 flex items-center">
        {selectedCount > 0 && (
          <Button onClick={onDeleteSelected} variant="danger">
            Delete Selected ({selectedCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkActions;