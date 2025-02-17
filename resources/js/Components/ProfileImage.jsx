import React from "react";

const ProfileImage = ({ name }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span className="user-profile-image avatar ring-success ring-offset-base-100 w-24 rounded-full ring-1 ring-offset-1">
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;
