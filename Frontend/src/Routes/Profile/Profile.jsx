import React from "react";
import { useContext } from "react";
import "./Profile.scss";
import { ContextGlobal } from "../../Components/utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

  const { state } = useContext(ContextGlobal);
  const { currentUser } = state;

  return (
    <>
      <div className="ta-avatar-profile">
        <div className="ta-avatar-icon">
        <FontAwesomeIcon icon={faUser} size="2xl" style={{"color": "#08404F"}} />
        </div>
        <div className="profile-data">
        <p className="user-name">{currentUser.name } {currentUser.surname}</p>
        <p className="user-name">{currentUser.email } </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
