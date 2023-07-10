import React from 'react';
import './Avatar.scss';
import gsap from 'gsap';
import Sidenav from '../SideNav/Sidenav';


const Avatar = ({ name, lastName, logOut }) => {
  
  const closeSidePanel = () => {
    gsap.fromTo('.ta-side-panel', { translateX: 0 }, { translateX: '100%', ease: 'power2.out' });
 };

 const openSidePanel = () => {
    gsap.fromTo('.ta-side-panel', { translateX: '100%' }, { translateX: '0', ease: 'power2.out' });
 };

  return (
    <div className='ta-avatar'>
      <div className='ta-avatar-name'>
        <span>Hola,</span>
        <span>{name} {lastName}</span>
      </div>
      <span onClick={openSidePanel} className='ta-avatar-initials'>
        {name && name.charAt(0)} {lastName && lastName.charAt(0)}
      </span>

      <Sidenav close={closeSidePanel} click={logOut} />
    </div>
  );
};

export default Avatar;
