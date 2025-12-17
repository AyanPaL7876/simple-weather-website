
export default function Element({ icon, text, value, unit = "", className = "" }) {
  return (
    <div className={`element ${className}`.trim()}>
      <img src={icon} alt="" />
      <div className="data">
        <div className="text">{text}</div>
        <div className="value">{value}{unit ? ` ${unit}` : ""}</div>
      </div>
    </div>
  );
}
