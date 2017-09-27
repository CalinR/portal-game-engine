export let deltaTime = 0;
export let lastUpdate = Date.now();
export const updateTime = () => {
    const currentTime = Date.now();
    deltaTime = (currentTime - lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
    lastUpdate = currentTime;
}