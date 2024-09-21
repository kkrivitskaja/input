import { SUGGESTED_TAGS } from '../constants/tagsConstants';
import { isTagCheck } from '../utils/tagUtils';
import { useTagsInput } from '../hooks/useTagsInput';
import SuggestedTag from './SuggestedTag';
import TagItem from './TagItem';

const TagsInput = () => {
    const {
        content,
        inputRef,
        inputValue,
        handleInputChange,
        handleKeyDown,
        insertTagAtCursor,
        handleTagDelete,
    } = useTagsInput();
    return (
        <div className="w-full p-4">
            <div className="border border-gray-300 p-2 rounded flex flex-wrap items-center">
                {content.map((item, index) =>
                    isTagCheck(item) ? (
                        <TagItem tag={item} key={item.id} onDelete={handleTagDelete} />
                    ) : (
                        <span key={index} className="mr-2 my-1">
                            {item}
                        </span>
                    )
                )}
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="outline-none border-none flex-grow"
                    placeholder="Type text or select tags..."
                />
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Suggested Tags:</h3>
                <div className="flex gap-2">
                    {SUGGESTED_TAGS.map((tag) => (
                        <SuggestedTag tag={tag} onInsertTag={insertTagAtCursor} key={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagsInput;
