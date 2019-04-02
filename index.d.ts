import Optional from './lib/optional';
export declare function ofNullable<T>(value: T | undefined | null): Optional<T>;
export declare function of<T>(value: T | null | undefined): Optional<T>;
export declare function empty(): Optional<null>;
