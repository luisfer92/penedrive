import React from 'react'
import { FaEdit } from 'react-icons/fa'
import ProfilePic from './common/ProfilePic'


export default function UserProfile(params) {
    return (
        
            
            <div className="d-flex w-100 flex-column p-4 shadow border-bottom">
                <p className="text-end"><FaEdit/></p>
                <ProfilePic />
                <h4 className="mt-4 mb-4 text-center">
                    currentUser
                </h4>
            </div>

        
    )
}