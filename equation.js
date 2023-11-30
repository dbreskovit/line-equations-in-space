export function checkPointOnLine(P0, V, P) {
  let t = [];
  for (let i = 0; i < 3; i++) {
    if (V[i] !== 0) {
      t.push((P[i] - P0[i]) / V[i]);
    }
  }
  console.log(t);
  return t.every((val) => val === t[0]);
}
