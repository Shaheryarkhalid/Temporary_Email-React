const ACTIONS_FETCH_EMAIL={
    GET_ASSIGNED_EMAIL:"GET_ASSIGNED_EMAIL",
    GET_ALL_EMAILS:"GET_ALL_EMAILS",
    GET_EMAIL:"GET_EMAIL",
    DELETE_EMAIL:"DELETE_EMAIL",
    SET_CUSTOM_EMAIL:"SET_CUSTOM_EMAIL"

}
async function Fetch_Email(action,payload="",Session_ID)
{
    switch(action)
    {
        case ACTIONS_FETCH_EMAIL.GET_ASSIGNED_EMAIL:
            return await fetch("https://api.guerrillamail.com/ajax.php?f=get_email_address&sid_token="+payload)
                         .then(response=>response.json())
                         .then(data=>data);
        case ACTIONS_FETCH_EMAIL.GET_ALL_EMAILS:
            return await fetch("https://api.guerrillamail.com/ajax.php?f=get_email_list&offset&sid_token="+payload)
                         .then(response=>response.json())
                         .then(data=>data);
        case ACTIONS_FETCH_EMAIL.GET_EMAIL:
            return await fetch("https://api.guerrillamail.com/ajax.php?f=fetch_email&sid_token="+Session_ID+"&email_id="+payload)
                         .then(response=>response.json())
                         .then(data=>data);
        case ACTIONS_FETCH_EMAIL.DELETE_EMAIL:
            return await fetch("https://api.guerrillamail.com/ajax.php?f=forget_me&email_addr="+payload+"&sid_token="+Session_ID)
                        .then(response=>response.json())
                        .then(data=>data);
        case ACTIONS_FETCH_EMAIL.SET_CUSTOM_EMAIL:
            return await fetch("https://api.guerrillamail.com/ajax.php?f=set_email_user&email_user="+payload)
                        .then(response=>response.json())
                        .then(data=>data);
    }
}

export {Fetch_Email,ACTIONS_FETCH_EMAIL}