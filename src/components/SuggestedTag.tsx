interface SuggestedTagProps {
    tag: string;
    onInsertTag: (tag) => void;
}

const SuggestedTag = ({ tag, onInsertTag }: SuggestedTagProps) => {
    return (
        <button
            onClick={() => onInsertTag(tag)}
            className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300"
            aria-label={`Add ${tag} tag`}
        >
            {tag}
        </button>
    );
};
export default SuggestedTag;
