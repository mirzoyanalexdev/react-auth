import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

export const Profile = () => {
    const { logOut } = useContext(AuthContext);

    return (
        <div className='bg-gray-800'>
            <div className='max-w-screen-2xl m-auto px-4 py-4'>
                <div className='flex justify-between  flex-col sm:flex-row'>
                    <div className='flex text-white text-3xl mb-12 sm:mb-0'>
                        Hello Marcus!!!
                    </div>
                    <button 
                        className="text-white text-xl hover:opacity-70 px-3"
                        onClick={logOut}
                    >
                        Log out
                    </button>
                </div>
            </div>
            
        </div>
    )
}