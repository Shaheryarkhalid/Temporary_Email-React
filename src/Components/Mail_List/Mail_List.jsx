import './Mail_List.css'
import { Fetch_Email,ACTIONS_FETCH_EMAIL } from '../../Hooks/Fetch_Email_API/Fetch_Email'
import { useEffect, useState } from 'react'

function Mail_List({Session_ID,set_Open_Mail,set_Opened_Mail})
{
  let [Email_List,set_Email_List]=useState({});
  useEffect(()=>{
    let x=async ()=>{
      let mail=await Fetch_Email(ACTIONS_FETCH_EMAIL.GET_ALL_EMAILS,Session_ID)
      mail.list.length&& set_Email_List(mail);
    }
    x();
    setInterval(async() => {
      x();
    },10000);
  },[Session_ID])
  return (
    <div className='Mail_List'>
      <div className="Header">
        <span>Sender</span>
        <span>Subject</span>
        <span>Time</span>
      </div>
      <div className="Mails">
        <div className="Loading"></div>
        {Email_List.list&&Email_List.list.length>0 && Email_List.list.map((val,index)=>{
            return(
              <div onClick={()=>{set_Open_Mail(true);set_Opened_Mail(val.mail_id)}}  key={index} className="Mail" style={{fontWeight: (val.mail_read=== 0||val.mail_read=== "0") && "bold"}}>
                <span>{val.mail_from}</span>
                <span>{val.mail_subject}</span>
                <span>{val.mail_date}</span>
              </div>
            )
            })
        }

      </div>
    </div>
  )
}
export default Mail_List