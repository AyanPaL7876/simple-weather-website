import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';


export default function Footer(){
    return (
        <div className="footer">
            <div className="links">
                <a href="https://www.facebook.com/ayan.pal.3304"><FacebookSharpIcon/></a>
                <a href="https://www.instagram.com/ayan.pal__/"><InstagramIcon  /></a>
                <a href="https://www.linkedin.com/in/ayan-pal-6a4297255/"><LinkedInIcon /></a>
                <a href="https://github.com/AyanPaL7876"><GitHubIcon /></a>
            </div>
        </div>
    );
}

