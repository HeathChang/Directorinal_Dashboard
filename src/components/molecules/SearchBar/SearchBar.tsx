import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Input } from '../../atoms/Input';

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = '검색어를 입력하세요...',
    className = ''
}) => {
    return (
        <div className={`w-full relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-11"
            />
        </div>
    );
};

