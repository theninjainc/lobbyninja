// eslint-disable-next-line react/prop-types
function FormatNumber({ value }) {
  if (value >= 1000) {
    return <>{(value / 1000).toFixed(1).replace(/\.0$/, '') + 'k'}</>;
  }
  return <>{value}</>;
}

export default FormatNumber;
