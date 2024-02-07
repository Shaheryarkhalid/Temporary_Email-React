import "./Popup.css"
import { Fetch_Email,ACTIONS_FETCH_EMAIL } from "../../Hooks/Fetch_Email_API/Fetch_Email";

function Popup({Subscriber_ID,Current_Email,set_PopUp,set_Current_Email,set_Subscriber_ID,set_Open_Mail}){
    
    let Set_Custom_Email=async (e)=>{
        e.preventDefault(); 
        let Submit =document.getElementById("Submit");
        Submit.className="Disabled";
        Submit.ariaDisabled=true
        await Fetch_Email(ACTIONS_FETCH_EMAIL.DELETE_EMAIL,Current_Email,Subscriber_ID);
        let mail=await Fetch_Email(ACTIONS_FETCH_EMAIL.SET_CUSTOM_EMAIL,e.target.Custom_User_Name.value);
        set_Current_Email(mail.email_addr);
        set_Subscriber_ID(mail.sid_token);
        var curCookie = "PHPSESSID" + "=" + mail.sid_token + 
        ", expires=Session" + 
        ", path=/"  + 
        ", domain=" + "http://localhost:5173/";
        document.cookie=curCookie;
        set_Open_Mail(false)
        set_PopUp(false)
        Submit.className="Disabled";
        Submit.ariaDisabled=false;
    }
    
    return (
        <>
            <div className="Popup">
                <form onSubmit={Set_Custom_Email} >
                    <button onClick={()=>set_PopUp(false)}  title='Close_Popup' className='Close_Popup' id='Close_Popup' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.01" fillRule="evenodd" clipRule="evenodd" d="M0 0V24H24V0H0Z" fill="#1C8FF8" fillOpacity="0.338428"/>
                            <path d="M5.76437 5.61626L5.05726 4.90915L5.05726 4.90915L5.76437 5.61626ZM7.17858 5.61626L6.47148 6.32336L7.17858 5.61626ZM5.76437 7.03047L6.47148 6.32336L5.76437 7.03047ZM10.6598 11.9259L11.3669 12.633C11.7574 12.2424 11.7574 11.6093 11.3669 11.2187L10.6598 11.9259ZM5.61614 16.9695L6.32324 17.6766L6.32324 17.6766L5.61614 16.9695ZM5.61614 18.3837L4.90903 19.0908L4.90903 19.0908L5.61614 18.3837ZM12.074 13.3401L12.7811 12.633C12.3905 12.2424 11.7574 12.2424 11.3669 12.633L12.074 13.3401ZM18.3836 18.2355L19.0907 18.9426L19.0907 18.9426L18.3836 18.2355ZM13.4882 11.9259L12.7811 11.2187C12.3905 11.6093 12.3905 12.2424 12.7811 12.633L13.4882 11.9259ZM18.2353 7.1787L18.9424 7.88581L18.9424 7.88581L18.2353 7.1787ZM18.2353 5.76449L18.9424 5.05738L18.9424 5.05738L18.2353 5.76449ZM16.8211 5.76449L16.114 5.05738V5.05738L16.8211 5.76449ZM12.074 10.5116L11.3669 11.2187C11.7574 11.6093 12.3905 11.6093 12.7811 11.2187L12.074 10.5116ZM6.47148 6.32336H6.47148L7.88569 4.90915C7.10464 4.1281 5.83831 4.1281 5.05726 4.90915L6.47148 6.32336ZM6.47148 6.32336L5.05726 4.90915C4.27621 5.6902 4.27621 6.95653 5.05726 7.73758L6.47148 6.32336ZM11.3669 11.2187L6.47148 6.32336L5.05726 7.73758L9.95265 12.633L11.3669 11.2187ZM6.32324 17.6766L11.3669 12.633L9.95265 11.2187L4.90903 16.2624L6.32324 17.6766ZM6.32324 17.6766L6.32324 17.6766L4.90903 16.2624C4.12798 17.0434 4.12798 18.3097 4.90903 19.0908L6.32324 17.6766ZM6.32324 17.6766H6.32324L4.90903 19.0908C5.69008 19.8718 6.95641 19.8718 7.73746 19.0908L6.32324 17.6766ZM11.3669 12.633L6.32324 17.6766L7.73746 19.0908L12.7811 14.0472L11.3669 12.633ZM17.6765 17.5283L12.7811 12.633L11.3669 14.0472L16.2622 18.9426L17.6765 17.5283ZM17.6765 17.5283L17.6765 17.5283L16.2622 18.9426C17.0433 19.7236 18.3096 19.7236 19.0907 18.9426L17.6765 17.5283ZM17.6765 17.5283L17.6765 17.5283L19.0907 18.9426C19.8717 18.1615 19.8717 16.8952 19.0907 16.1141L17.6765 17.5283ZM12.7811 12.633L17.6765 17.5283L19.0907 16.1141L14.1953 11.2187L12.7811 12.633ZM17.5282 6.4716L12.7811 11.2187L14.1953 12.633L18.9424 7.88581L17.5282 6.4716ZM17.5282 6.4716V6.4716L18.9424 7.88581C19.7235 7.10476 19.7235 5.83843 18.9424 5.05738L17.5282 6.4716ZM17.5282 6.4716H17.5282L18.9424 5.05738C18.1614 4.27634 16.8951 4.27634 16.114 5.05738L17.5282 6.4716ZM12.7811 11.2187L17.5282 6.4716L16.114 5.05738L11.3669 9.80453L12.7811 11.2187ZM6.47148 6.32336L11.3669 11.2187L12.7811 9.80453L7.88569 4.90915L6.47148 6.32336Z" fill="#22242B"/>
                        </svg>
                    </button>
                    <span>Enter Custom Name...</span>
                    <input type="text" name="Custom_User_Name" className="" id="Custom_User_Name" />
                    <input type="submit" name="submit" className="submit" id="Submit" />
                </form>
            </div>
        </>
    )
}
export default Popup