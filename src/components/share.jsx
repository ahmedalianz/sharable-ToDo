import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { toast } from "react-toastify";
export default function Share({ listName, userId }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://sharable-todo.herokuapp.com/listView/${userId}/${listName}`
    );
    toast.info("list link copied to clipboard");
  };
  return (
    <div>
      <FacebookShareButton
        className="mx-1"
        url={`https://sharable-todo.herokuapp.com/listView/${userId}/${listName}`}
        quote={"Hey Watch My To Do List Here . ."}
        hashtag="#React#FireBase"
      >
        <FacebookIcon logofillcolor="white" size={35} round={true} />
      </FacebookShareButton>
      <EmailShareButton
        className="mx-1"
        url={`https://sharable-todo.herokuapp.com/listView/${userId}/${listName}`}
        subject="Hey Watch My To Do List Here . ."
        separator=" "
        body="open this link and watch my to do list ==> "
      >
        <EmailIcon logofillcolor="white" size={35} round={true} />
      </EmailShareButton>
      <LinkedinShareButton
        className="mx-1"
        url={`https://sharable-todo.herokuapp.com/listView/${userId}/${listName}`}
      >
        <LinkedinIcon logofillcolor="white" size={35} round={true} />
      </LinkedinShareButton>
      <WhatsappShareButton
        className="mx-1"
        url={`https://sharable-todo.herokuapp.com/listView/${userId}/${listName}`}
        title="Hey Watch My To Do List Here . ."
      >
        <WhatsappIcon logofillcolor="white" size={35} round={true} />
      </WhatsappShareButton>
      <i className="fas fa-link" onClick={() => handleCopy()}></i>
    </div>
  );
}
