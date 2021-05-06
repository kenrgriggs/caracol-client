import React from 'react'

export interface UserProfileProps {
    
}
 
export interface UserProfileState {
    
}
 
class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <div>
                User profile Page
            </div>
         );
    }
}
 
export default UserProfile;