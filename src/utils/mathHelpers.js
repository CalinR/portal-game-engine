export const findMin = (acc, cur) => {
    return Math.min(acc, cur);
}

export const findMax = (acc, cur) => {
    return Math.max(acc, cur);
}

export const pointSide = (a, b, c) => {
    return ((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x)) > 0;
}

const cross = (a, b) => {
    return (a.x * b.y) - (b.x * a.y)
}
export const intersectLines = (a, b, c, d) => {
    const denominator = cross({ x: b.x-a.x, y: d.x-c.x }, { x: b.y-a.y, y: d.y-c.y });
    const numerator1  = cross({ x: a.y-c.y, y: d.y-c.y }, { x: a.x-c.x, y: d.x-c.x });
    const numerator2  = cross({ x: a.y-c.y, y: b.y-a.y }, { x: a.x-c.x, y: b.x-a.x });

    if(denominator == 0){
        return numerator1 == 0 && numerator2 == 0;
    }

    const r = numerator1 / denominator;
    const s = numerator2 / denominator;

    return (r > 0 && r <= 1) && (s >= 0 && s <= 1);
}