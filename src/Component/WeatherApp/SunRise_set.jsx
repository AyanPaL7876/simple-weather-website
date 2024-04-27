import sunRiseIcon from "../assets/sunrise1.svg";
import sunSetIcon from "../assets/sunset1.svg";
import "./SunRise_set.css";
export default function SunRise_set({sunset,sunrise}){
  return (
    <div className="sunElement">
        <div className="rise-data">
            <div className="text">Sun rise</div>
            <div className="value">{sunrise}</div>
        </div>
        <div className="sunIcon">
          <img src={sunRiseIcon} alt="" />
          <img src={sunSetIcon} alt="" />
        </div>
        <div className="set-data">
            <div className="text">Sun set</div>
            <div className="value">{sunset}</div>
        </div>
    </div>
  );
}
