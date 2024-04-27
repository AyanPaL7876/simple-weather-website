
export default function Element({icon,text,value,isDeg=false}){
  return (
    <div className="element">
        <img src={icon} alt="" />
        <div className="data">
            <div className="text">{text}</div>
            <div className="value">{value}{isDeg ? "°C" : ""}</div>
        </div>
    </div>
  )
}
