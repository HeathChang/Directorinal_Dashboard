import React from 'react';
import { Modal } from '../../atoms/Modal';
import type { iColumnConfig } from '../../../types/general.type';
import { Button } from '@mui/material';

export interface ColumnSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: iColumnConfig[];
    onUpdateColumns: (columns: iColumnConfig[]) => void;
}

export const ColumnSettingsModal: React.FC<ColumnSettingsModalProps> = ({
    isOpen,
    onClose,
    columns,
    onUpdateColumns
}) => {
    const [localColumns, setLocalColumns] = React.useState<iColumnConfig[]>(columns);

    React.useEffect(() => {
        setLocalColumns(columns);
    }, [columns]);

    const handleToggleVisibility = (columnId: string) => {
        setLocalColumns(prev =>
            prev.map(col =>
                col.id === columnId ? { ...col, visible: !col.visible } : col
            )
        );
    };

    const handleSave = () => {
        onUpdateColumns(localColumns);
        onClose();
    };

    const handleReset = () => {
        setLocalColumns(columns);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="컬럼 설정"
            size="sm"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    {localColumns.map((column) => (
                        <div
                            key={column.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                        >
                            <label className="flex items-center gap-2 cursor-pointer w-full">
                                <input
                                    type="checkbox"
                                    checked={column.visible}
                                    onChange={() => handleToggleVisibility(column.id)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="font-medium text-gray-700">{column.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outlined" onClick={handleReset} size="small">
                        초기화
                    </Button>
                    <Button variant="contained" onClick={handleSave} size="small">
                        저장
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

