import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function Toast({ value }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className='absolute right-10 bottom-10 p-4 flex gap-4 bg-red-500 text-white items-center'>
      <FontAwesomeIcon icon={faCircleInfo} />
      <div>{value}</div>
    </div>
  );
}

export default Toast;
