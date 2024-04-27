import img01d from "../assets/01d.png";
import img01n from "../assets/01n.png";
import img02d from "../assets/02d.png";
import img02n from "../assets/02n.png";
import img03d from "../assets/03d.png";
import img03n from "../assets/03n.png";
import img04d from "../assets/04d.png";
import img04n from "../assets/04n.png";
import img09d from "../assets/09d.png";
import img09n from "../assets/09n.png";
import img10d from "../assets/10d.png";
import img10n from "../assets/10n.png";
import img11d from "../assets/11d.png";
import img11n from "../assets/11n.png";
import img13d from "../assets/13d.png";
import img13n from "../assets/13n.png";
import img50d from "../assets/50d.png";
import img50n from "../assets/50n.png";

export default function SetIcon({weatherIcon,description}){
    let icon;
    switch (weatherIcon) {
        case '01d': icon = img01d;
            break;
        case '01n': icon = img01n;
            break;
        case '02d': icon = img02d;
            break;
        case '02n': icon = img02n;
            break;
        case '03d': icon = img03d;
            break;
        case '03n': icon = img03n;
            break;
        case '04d': icon = img04d;
            break;
        case '04n': icon = img04n;
            break;
        case '09d': icon = img09d;
            break;
        case '09n': icon = img09n;
            break;
        case '10d': icon = img10d;
            break;
        case '10n': icon = img10n;
            break;
        case '11d': icon = img11d;
            break;
        case '11n': icon = img11n;
            break;
        case '13d': icon = img13d;
            break;
        case '13n': icon = img13n;
            break;
        case '50d': icon = img50d;
            break;
        case '50n': icon = img50n;
            break;
        default: icon = img01d;
            break;
    }
    
    return(
        <div className="weatherImage">
            <img src={icon} alt="" />
            <div>{description}</div>
        </div>
    );
}