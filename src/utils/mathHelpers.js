export const findMin = (acc, cur) => {
    return Math.min(acc, cur);
}

export const findMax = (acc, cur) => {
    return Math.max(acc, cur);
}

export const pointSide = (a, b, c) => {
    return ((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x)) > 0;
}