export default function TableData(props) {
  function rounding(num) {
    return parseFloat(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function getChange(num) {
    const change = Math.abs(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return parseFloat(num) > 0 ? `▲ ${change}` : `▼ ${change}`;
  }

  const style = {
    color: parseFloat(props.priceChangePercent) > 0 ? "green" : "red"
  };

  return (
    <tr>
      <td>{props.number + 1}</td>
      <td>{props.symbol}</td>
      <td>${rounding(props.bidPrice)}</td>
      <td style={style}>{getChange(props.priceChangePercent)}%</td>
    </tr>
  );
}
