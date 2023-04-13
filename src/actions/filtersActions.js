export const SET_SORT = 'filters:setSort';
export const SET_CYCLE = 'filters:setCycle';
export const SET_BREED = 'filters:setBreed';
export const SET_FILTER = 'filters:setFilter';

export function setSort(sortValue){
    return {
        type: SET_SORT,
        payload: sortValue
    }
};

export function setCycle(cycle){
    return {
        type: SET_CYCLE,
        payload: cycle
    }
};

export function setBreed(breed){
    return {
        type: SET_BREED,
        payload: breed
    }
};

export function setFilter(filter){
    return {
        type: SET_FILTER,
        payload: filter.toLowerCase()
    }
};
