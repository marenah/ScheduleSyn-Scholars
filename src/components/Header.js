import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../resources/firebase';
import { useUser } from '../resources/UserContext';
import NotificationBell from './NotificationBell';

const Header = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const user = useUser();

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                if (user) {
                    const userDocRef = firestore
                        .collection('users')
                        .doc(user.uid);
                    const userDoc = await userDocRef.get();
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        if (userData && userData.imageURL) {
                            setProfilePictureUrl(userData.imageURL);
                        } else {
                            setProfilePictureUrl('/Screenshot 2023-09-15 at 1.46 1.png');
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, [user]);

    return (
        <header className="flex w-full items-center bg-green-800 px-2 py-2 text-white">
            <img src="BearLogo.png" alt="Logo.png" className="h-28 w-auto" />

            <p className="font m1-auto text-5xl">DateWise</p>

            <div className="flex-grow"></div>
            <NotificationBell />

            <Link to="/MyProfile">
                <div className="pr-4 w-24">
                    {profilePictureUrl ? (
                        <div className='flex items-center justify-center mt-2 h-24 w-24 rounded-full bg-gray-300'>
                            <img
                                alt="User profile"
                                src={profilePictureUrl}
                            />
                        </div>
                    ) : (
                        <div className="h-24 w-24 rounded-full bg-gray-300"></div>
                    )}
                </div>
            </Link>
        </header>
    );
};

export default Header;
