export const isThenable = (p: any): boolean => {
  return (
    p !== null &&
    (typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  );
};
