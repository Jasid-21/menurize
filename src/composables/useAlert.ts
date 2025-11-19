export function useAlert() {
  const fireAlert = (msg: string) => {
    alert(msg);
  }

  return {
    fireAlert,
  }
}
