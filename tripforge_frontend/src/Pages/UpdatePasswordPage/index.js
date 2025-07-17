import React from 'react'
import Navbar from '../../Components/Navbar'
import UpdatePassword from '../../features/auth/components/UpdatePassword';

function UpdatePasswordPage() {
    return (
        <>
            <Navbar></Navbar>
            <UpdatePassword></UpdatePassword>
        </>
    )
}

export default UpdatePasswordPage;