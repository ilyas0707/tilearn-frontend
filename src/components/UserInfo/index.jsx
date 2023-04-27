import React from "react";
import styles from "./UserInfo.module.scss";
import Avatar from "@mui/material/Avatar";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = dateTime.toLocaleDateString(undefined, dateOptions);
    const time = dateTime.toLocaleTimeString(undefined, timeOptions);
    return `${date} at ${time}`;
  }

  function getInitials(fullName = "") {
    const words = fullName.split(" ");
    const initials = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0) {
        initials.push(word.charAt(0).toUpperCase());
      }
    }

    return initials.join("");
  }

  return (
    <div className={styles.root}>
      <Avatar sx={{ bgcolor: "#000" }} className={styles.avatar}>
        {getInitials(fullName)}
      </Avatar>
      {/* <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullName}
      /> */}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>
          {formatDateTime(additionalText)}
        </span>
      </div>
    </div>
  );
};
