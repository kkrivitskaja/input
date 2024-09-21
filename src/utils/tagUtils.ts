import { Tag } from "../types/tagTypes";

export const isTagCheck = (item: Tag | string): item is Tag => typeof item === 'object';

export const createTag = (text: string): Tag => ({
    id: Date.now(),
    text,
});
