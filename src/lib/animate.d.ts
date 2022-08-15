export declare const easeOutCubic: (t: number) => number;
export declare const animate: (duration: number, callback: (t: number) => void, options?: {
    easing?: ((t: number) => number) | undefined;
    range?: [number, number] | undefined;
}) => void;
