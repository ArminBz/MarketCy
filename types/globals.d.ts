// Globals available at runtime in React Native that aren't in the default
// TypeScript lib (es2017): `alert` is provided by RN, and the generated
// OpenAPI client uses `btoa`/`atob` for Basic-auth encoding.
declare function alert(message?: string): void;
declare function btoa(data: string): string;
declare function atob(data: string): string;
