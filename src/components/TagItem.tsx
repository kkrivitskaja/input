import React, { useCallback } from 'react';
import { Tag } from '../types/tagTypes';

interface TagItemProps {
    tag: Tag;
    onDelete: (id: number) => void;
}

const TagItem: React.FC<TagItemProps> = ({ tag, onDelete }) => {
    
    const handleDelete = useCallback(() => {
        onDelete(tag.id);
    }, [onDelete, tag.id]);

    return (
        <div
            key={tag.id}
            className="flex items-center bg-gray-200 text-black rounded-full px-6 py-2 mr-2 gap-x-2 relative hover:bg-gray-300"
        >
            {tag.text}
            <button
                className="w-3 h-3 flex items-center justify-center rounded-full bg-gray-400 text-black text-xs hover:text-red-600 focus:outline-none absolute top-[6px] right-2"
                aria-label={`Delete ${tag.text}`}
                onClick={handleDelete}
            >
                &times;
            </button>
        </div>
    );
};

export default TagItem;
