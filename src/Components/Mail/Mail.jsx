import { useEffect, useState } from 'react'
import { Fetch_Email,ACTIONS_FETCH_EMAIL } from '../../Hooks/Fetch_Email_API/Fetch_Email';
import './Mail.css'

const Mail = ({set_Opened_Mail,set_Open_Mail,Opened_Mail,Session_ID}) => {

  let [Email,set_Email]=useState({});
  useEffect(()=>{
    (async()=>{
        set_Email(await Fetch_Email(ACTIONS_FETCH_EMAIL.GET_EMAIL,Opened_Mail,Session_ID));
    })()
  },[Opened_Mail])
  return (
    <div className="Mail">
      <div className="Mail_Header">
        <div className="Back">
          <svg width="10" height="24" viewBox="0 0 10 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66699 7.75L2.50033 12.75L6.66699 17.75" stroke="#CDCDD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <button onClick={()=>{set_Open_Mail(false);set_Opened_Mail({})}}>Back To Inbox</button>
        
        </div>
      </div>

      <div className="Mail_Details">
        <div className="User_Details">
          <div className="Logo">{ Email.mail_from? Email.mail_from.charAt(0).toUpperCase():""}</div>
          <div className="Mail_Name">
            <span className="Email" style={{textTransform:'uppercase'}}>{Email.mail_from}</span>
          </div>
        </div>
        <div className="Date_Section">
          <span className='Date_Text'>Date:</span>
          <span className='Date'>{Email.mail_date}</span>
        </div>
        <span className="Border_Bottom"></span>
      </div>

      <div className="Subject-Sec">
        <span>Subject: </span>
        <span className='Subject'>{Email.mail_subject}</span>
      </div>
      <div className="Mail_Content" id='Mail_Content' dangerouslySetInnerHTML={{ __html: Email.mail_body}}>
         
      </div>
    </div>
  )
}

export default Mail