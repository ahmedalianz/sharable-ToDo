import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    EmailIcon,
    FacebookIcon,  
} from "react-share";  
export default function Share() {
    return (
        <div>
            <FacebookShareButton className="mx-1"
                url="https://sharable-to-do-list.web.app/"
                quote={"Hey Watch My To Do List Here . ."}
                hashtag="#React-FireBase"
            >
                <FacebookIcon logofillcolor="white" size={35} round={true}/>
            </FacebookShareButton>
            <EmailShareButton className="mx-1"
                url="https://sharable-to-do-list.web.app/"
                subject="Hey Watch My To Do List Here . ."
                separator=" "
                body="open this link and watch my to do list ==> "
            >
                <EmailIcon logofillcolor="white" size={35} round={true}/>
            </EmailShareButton>
            <LinkedinShareButton className="mx-1"
                url="https://sharable-to-do-list.web.app/"
            >
                <LinkedinIcon logofillcolor="white" size={35} round={true}/>
            </LinkedinShareButton>
        </div>
    )
}
