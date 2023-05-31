import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function CircleButton() {
    return (
      <button className='circle-button'>
        {/* <i className='fas fa-plus'></i> */}
        <FontAwesomeIcon icon={faPlus} />
      </button>
    );
  }
  
export default CircleButton;