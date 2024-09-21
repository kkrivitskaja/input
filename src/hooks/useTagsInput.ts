import { useCallback, useEffect, useRef, useState } from 'react';
import { createTag, isTagCheck } from '../utils/tagUtils';
import { Tag } from '../types/tagTypes';

export const useTagsInput = () => {
    const [content, setContent] = useState<(Tag | string)[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [cursorPos, setCursorPos] = useState<number>(0);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setCursorPos(e.target.selectionStart || 0);
    }, []);

    const insertTagAtCursor = useCallback(
        (tag: string) => {
            const newTag = createTag(tag);

            const isTagDuplicate = content.some(
                (item) => isTagCheck(item) && item.text.toLowerCase() === newTag.text.toLowerCase()
            );

            if (isTagDuplicate) {
                return;
            }

            const beforeCursor = inputValue.slice(0, cursorPos);
            const afterCursor = inputValue.slice(cursorPos);

            const newContent = [
                ...content.slice(0, cursorPos),
                beforeCursor,
                newTag,
                afterCursor,
            ].filter(Boolean);

            setContent(newContent);
            setInputValue('');
            setCursorPos(cursorPos + 1);
            inputRef.current?.focus();
        },
        [content, cursorPos, inputValue]
    );

    // Delete a tag by its ID
    const handleTagDelete = useCallback(
        (id: number) => {
            setContent(content.filter((item) => !(isTagCheck(item) && item.id === id)));
        },
        [content]
    );

    // Handle backspace for deleting text or tags
    const handleBackspace = useCallback(() => {
        if (inputValue.length === 0 && content.length > 0) {
            const lastItem = content[content.length - 1];
            if (typeof lastItem === 'string') {
                const updatedText = lastItem.slice(0, -1);
                setContent(
                    updatedText ? [...content.slice(0, -1), updatedText] : content.slice(0, -1)
                );
            } else {
                handleTagDelete(lastItem.id);
            }
        }
    }, [inputValue, content, handleTagDelete]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const isCursorAtTagEnd = () =>
                cursorPos > 0 && typeof content[cursorPos - 1] === 'object';
            
            if (e.key === 'Backspace') {
                e.preventDefault();
                if (inputValue.length === 0) {
                    handleBackspace();
                } else if (isCursorAtTagEnd()) {
                    e.preventDefault();
                    const tagToDelete = content[cursorPos - 1] as Tag;
                    handleTagDelete(tagToDelete.id);
                    setCursorPos(cursorPos - 1);
                } else if (cursorPos > 0 && typeof content[cursorPos - 1] === 'string') {
                    e.preventDefault();
                    const updatedContent = [...content];
                    const text = updatedContent[cursorPos - 1] as string;
                    const updatedText = text.slice(0, -1);
                    if (updatedText) {
                        updatedContent[cursorPos - 1] = updatedText;
                    } else {
                        updatedContent.splice(cursorPos - 1, 1);
                        setCursorPos(cursorPos - 1);
                    }
                    setContent(updatedContent);
                }
            }
        },
        [inputValue, content, cursorPos, handleBackspace, handleTagDelete]
    );

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.selectionStart = cursorPos;
            inputRef.current.selectionEnd = cursorPos;
        }
    }, [cursorPos]);
    return {
        content,
        inputRef,
        inputValue,
        handleTagDelete,
        handleInputChange,
        handleKeyDown,
        insertTagAtCursor,
    };
};
