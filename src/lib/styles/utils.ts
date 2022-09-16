import facepaint from 'facepaint';

export const breakpoints = [640, 768, 1024];

export const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
export const fp = facepaint(mq);
