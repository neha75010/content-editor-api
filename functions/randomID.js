export default function randomID () { return btoa( btoa(Math.random()) + btoa(Date.now().toString()) ); }