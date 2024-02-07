import './Main_Page.css'
import { createPortal } from 'react-dom'
import { useState,useEffect } from 'react'
import {Fetch_Email,ACTIONS_FETCH_EMAIL} from '../../Hooks/Fetch_Email_API/Fetch_Email.js'

import Popup from '../Popup/Popup.jsx'
import Mail_List from '../Mail_List/Mail_List.jsx'
import Mail from '../Mail/Mail.jsx'


const Main_Page = () => {
  let [Subscriber_ID,set_Subscriber_ID]=useState("");
  let [Current_Email,set_Current_Email]=useState("");
  let [Open_Mail,set_Open_Mail]=useState(false);
  let [Opened_Mail,set_Opened_Mail]=useState("");
  let [PopUp,set_PopUp]=useState(false);

  let Get_Name=document.getElementById("Get_Name")
  useEffect(()=>{
    let Get_Email=async ()=>{
      let mail=await Fetch_Email(ACTIONS_FETCH_EMAIL.GET_ASSIGNED_EMAIL,Subscriber_ID);
      set_Current_Email(mail.email_addr);
      set_Subscriber_ID(mail.sid_token);
      var curCookie = "PHPSESSID" + "=" + mail.sid_token + 
          ", expires=Session" + 
          ", path=/"  + 
          ", domain=" + "http://localhost:5173/";
      document.cookie=curCookie;
    }
    Get_Email();
  },[])

  async function  Delete_Email()
  {
    let BTN=document.getElementById("Delete_Email");
    BTN.className="Delete_Email";
    BTN.ariaDisabled=true;
    Fetch_Email(ACTIONS_FETCH_EMAIL.DELETE_EMAIL,Current_Email,Subscriber_ID)
    let mail=await Fetch_Email(ACTIONS_FETCH_EMAIL.GET_ASSIGNED_EMAIL);
    set_Subscriber_ID(mail.sid_token);
    set_Current_Email(mail.email_addr);
    BTN.className="";
    BTN.ariaDisabled=false;
    set_Open_Mail(false)
  } 
  return (
    <div className='Main_Page'> 
      <div className="Upper_Section">
        <span className='Title'>Your Temporary Email</span>
        <div className="Mail_Holder">
          <span className='Email' id='Email'>{Current_Email&& Current_Email}</span>
          <span className="Copied" id='Copied'>Copied</span>
          <button onClick={Copy_Email} title='Copy Email Address to Clip Board' className='Copy_Button'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24.7397 9.91727V19.9465C24.7397 21.0543 23.8416 21.9524 22.7338 21.9524C22.1799 21.9524 21.7309 21.5033 21.7309 20.9494V14.27C21.7315 13.9643 21.6085 13.6713 21.3899 13.4576L17.8997 10.0075C17.2774 9.37513 16.4301 9.01459 15.5429 9.00461H11.7017C11.1478 9.00461 10.6987 8.55559 10.6987 8.00169V6.87841C10.6987 6.11327 11.0034 5.37962 11.5454 4.83953C12.0873 4.29943 12.822 3.99735 13.5872 4.00002H18.9127C19.6658 4.00761 20.3859 4.31006 20.9186 4.84247L23.9273 7.85125C24.4625 8.40421 24.7549 9.14788 24.7397 9.91727ZM19.8855 13.929L16.8768 10.9202C16.3453 10.386 15.6244 10.0832 14.8709 10.0777H9.54539C7.95407 10.0833 6.66698 11.3748 6.66699 12.9662V25.1116C6.66699 26.7068 7.96018 28 9.55541 28H17.8697C19.4531 27.9835 20.7281 26.6951 20.728 25.1116V15.9348C20.7358 15.1776 20.4479 14.4472 19.9257 13.8989L19.8855 13.929Z" fill="#ffffff"></path>
            </svg>
          </button>
        </div>
        <div className="Actions">
          <button onClick={()=>set_Open_Mail(false)} title='Refresh Recieved' className='Refresh_Email'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.507 10H14.969C14.419 10 14.287 9.688 14.687 9.29L16.226 7.757C15.1036 6.63782 13.585 6.00648 12 6V4C14.1174 4.00488 16.1472 4.84631 17.647 6.341L19.294 4.701C19.684 4.313 20 4.449 20 4.989V9.507C19.9962 9.7777 19.7777 9.99624 19.507 10ZM4 12C4 7.58172 7.58172 4 12 4V6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18V20C7.58172 20 4 16.4183 4 12ZM18.011 12.765C18.0995 12.2964 18.5242 11.9679 19 12C19.3045 11.9989 19.5929 12.1367 19.7834 12.3741C19.974 12.6116 20.046 12.923 19.979 13.22C19.3653 17.1281 15.995 20.006 12.039 20H12V18H12.035C15.0596 18.005 17.6179 15.764 18.011 12.765Z" fill="#22242B"/>
            </svg>  
           Refresh</button>

          <button onClick={()=>set_PopUp(true)} title='Change Email' className='Change_Email'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
              <g filter="url(#filter0_d)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21 20.039C21 20.4302 20.6829 20.7474 20.2917 20.7474H9.66676C9.27556 20.7474 8.95843 20.4302 8.95843 20.039C8.95843 19.6478 9.27556 19.3307 9.66676 19.3307H20.2917C20.6829 19.3307 21 19.6478 21 20.039ZM8.49094 16.9366L5.22555 15.0807C5.0103 14.9563 4.74555 14.9538 4.52799 15.0741C4.31043 15.1945 4.17192 15.4202 4.16306 15.6687L4.00014 20.3365C3.99631 20.478 4.07089 20.61 4.19402 20.6797C4.31715 20.7494 4.46872 20.7455 4.58805 20.6694L8.51927 18.1549C8.73144 18.0224 8.85798 17.7877 8.85216 17.5376C8.84634 17.2876 8.70904 17.0591 8.49094 16.9366ZM6.83345 14.2166L8.44135 15.1374C9.4605 15.7177 10.7571 15.3627 11.3384 14.3441L14.8801 8.09663C15.4604 7.07748 15.1053 5.78088 14.0867 5.19957L12.4788 4.27874C11.4597 3.69843 10.1631 4.05349 9.58176 5.07207L6.04012 11.3195C5.45981 12.3387 5.81487 13.6353 6.83345 14.2166Z" fill="#22242B"/>
              </g>
              <defs>
                  <filter id="filter0_d" x="-4" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
              </defs>
            </svg>  
          Change Email</button> 

          <button onClick={Delete_Email} title='Delete Email' className='' id='Delete_Email' >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.01" fillRule="evenodd" clipRule="evenodd" d="M0 0V24H24V0H0Z" fill="#1C8FF8" fillOpacity="0.338428"/>
                  <path d="M5.76437 5.61626L5.05726 4.90915L5.05726 4.90915L5.76437 5.61626ZM7.17858 5.61626L6.47148 6.32336L7.17858 5.61626ZM5.76437 7.03047L6.47148 6.32336L5.76437 7.03047ZM10.6598 11.9259L11.3669 12.633C11.7574 12.2424 11.7574 11.6093 11.3669 11.2187L10.6598 11.9259ZM5.61614 16.9695L6.32324 17.6766L6.32324 17.6766L5.61614 16.9695ZM5.61614 18.3837L4.90903 19.0908L4.90903 19.0908L5.61614 18.3837ZM12.074 13.3401L12.7811 12.633C12.3905 12.2424 11.7574 12.2424 11.3669 12.633L12.074 13.3401ZM18.3836 18.2355L19.0907 18.9426L19.0907 18.9426L18.3836 18.2355ZM13.4882 11.9259L12.7811 11.2187C12.3905 11.6093 12.3905 12.2424 12.7811 12.633L13.4882 11.9259ZM18.2353 7.1787L18.9424 7.88581L18.9424 7.88581L18.2353 7.1787ZM18.2353 5.76449L18.9424 5.05738L18.9424 5.05738L18.2353 5.76449ZM16.8211 5.76449L16.114 5.05738V5.05738L16.8211 5.76449ZM12.074 10.5116L11.3669 11.2187C11.7574 11.6093 12.3905 11.6093 12.7811 11.2187L12.074 10.5116ZM6.47148 6.32336H6.47148L7.88569 4.90915C7.10464 4.1281 5.83831 4.1281 5.05726 4.90915L6.47148 6.32336ZM6.47148 6.32336L5.05726 4.90915C4.27621 5.6902 4.27621 6.95653 5.05726 7.73758L6.47148 6.32336ZM11.3669 11.2187L6.47148 6.32336L5.05726 7.73758L9.95265 12.633L11.3669 11.2187ZM6.32324 17.6766L11.3669 12.633L9.95265 11.2187L4.90903 16.2624L6.32324 17.6766ZM6.32324 17.6766L6.32324 17.6766L4.90903 16.2624C4.12798 17.0434 4.12798 18.3097 4.90903 19.0908L6.32324 17.6766ZM6.32324 17.6766H6.32324L4.90903 19.0908C5.69008 19.8718 6.95641 19.8718 7.73746 19.0908L6.32324 17.6766ZM11.3669 12.633L6.32324 17.6766L7.73746 19.0908L12.7811 14.0472L11.3669 12.633ZM17.6765 17.5283L12.7811 12.633L11.3669 14.0472L16.2622 18.9426L17.6765 17.5283ZM17.6765 17.5283L17.6765 17.5283L16.2622 18.9426C17.0433 19.7236 18.3096 19.7236 19.0907 18.9426L17.6765 17.5283ZM17.6765 17.5283L17.6765 17.5283L19.0907 18.9426C19.8717 18.1615 19.8717 16.8952 19.0907 16.1141L17.6765 17.5283ZM12.7811 12.633L17.6765 17.5283L19.0907 16.1141L14.1953 11.2187L12.7811 12.633ZM17.5282 6.4716L12.7811 11.2187L14.1953 12.633L18.9424 7.88581L17.5282 6.4716ZM17.5282 6.4716V6.4716L18.9424 7.88581C19.7235 7.10476 19.7235 5.83843 18.9424 5.05738L17.5282 6.4716ZM17.5282 6.4716H17.5282L18.9424 5.05738C18.1614 4.27634 16.8951 4.27634 16.114 5.05738L17.5282 6.4716ZM12.7811 11.2187L17.5282 6.4716L16.114 5.05738L11.3669 9.80453L12.7811 11.2187ZM6.47148 6.32336L11.3669 11.2187L12.7811 9.80453L7.88569 4.90915L6.47148 6.32336Z" fill="#22242B"/>
              </svg>
           Delete Email</button>
        </div>
      </div>
      {
        PopUp&& createPortal(
          <Popup set_Open_Mail={set_Open_Mail} Subscriber_ID={Subscriber_ID} Current_Email={Current_Email} set_Current_Email={set_Current_Email} set_Subscriber_ID={set_Subscriber_ID} set_PopUp={set_PopUp} />,
          Get_Name
        )
      }
      <div className="Emails">
        {
          Open_Mail?<Mail Session_ID={Subscriber_ID} Opened_Mail={Opened_Mail} set_Opened_Mail={set_Opened_Mail} set_Open_Mail={set_Open_Mail}/>:<Mail_List set_Opened_Mail={set_Opened_Mail} set_Open_Mail={set_Open_Mail}  Session_ID={Subscriber_ID} />
        }
      </div>
    </div>
  )
}

const Copy_Email=()=>{
  navigator.clipboard.writeText(document.getElementById("Email").innerText);
  let x=document.getElementById("Copied");
  x.style.display="block";
  setTimeout(()=>{
    x.style.display="none"
  },1000)
}
export default Main_Page