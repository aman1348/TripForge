import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails, updateUserInfoAsync } from "../../../features/User/userSlice";



function EditUserProfile({ isEditing, setIsEditing }) {
    const userDetails = useSelector(selectUserDetails);
    const dispatch = useDispatch();


    const saveUserDetails = (e) => {
        e.preventDefault();
        const newDetails = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            gender: e.target.gender.value,
            contact: e.target.phone.value,
            address: e.target.address.value
        }
        // console.log(e.target.firstName.value);
        // console.log(e.target.lastName.value);
        // console.log(e.target.gender.value);
        // console.log(e.target.phone.value);
        // console.log(e.target.address.value);

        const newUserDetails = { ...userDetails, ...newDetails };
        console.log("edited user details", newUserDetails);
        
        dispatch(updateUserInfoAsync(newUserDetails));





        // save user dateins in redux state




        setIsEditing(!isEditing);

    }


    return (<>
        <form className="bg-white p-3 shadow-sm rounded-sm" onSubmit={saveUserDetails}>
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
                <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                        <label for="first_name" className="px-4 py-2 font-semibold">First Name</label>
                        <input id="first_name" type="text" name="firstName" className="py-0" defaultValue={userDetails?.firstName} />
                    </div>
                    <div className="grid grid-cols-2">
                        <label for="last_name" className="px-4 py-2 font-semibold">Last Name</label>
                        <input id="last_name" type="text" name="lastName" className="py-0"  defaultValue={userDetails?.lastName} />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="px-4 py-2 font-semibold">Gender</label>
                        {/* <div className="px-4 py-2">Female</div> */}
                        <select class="form-select block w-full mt-1" name="gender">
                            <option value="" selected disabled hidden>Choose gender</option>
                            <option selected={userDetails?.gender === "male"} value="male">male</option>
                            <option selected={userDetails?.gender === "female"} value="female">female</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2">
                        <label for="phone" className="px-4 py-2 font-semibold">Contact No.</label>
                        {/* <div className="px-4 py-2">+11 998001001</div> */}
                        <input type="text"
                            id="phone"
                            name="phone"
                            aria-describedby="helper-text-explanation"
                            className="py-0"
                            // pattern="[7-9]{3}[0-9]{3}[0-9]{4}"
                            placeholder="123-456-7890"
                            defaultValue={userDetails?.contact}
                        />

                    </div>
                    <div className="grid grid-cols-2">
                        <label for="address" className="px-4 py-2 font-semibold">Address</label>
                        <input id="address" type="text" name="address" className="py-0" defaultValue={userDetails?.address} />
                    </div>
                    {/* <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Permanant Address</div>
                        <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                    </div> */}
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                            <a className="text-blue-800" href="mailto:jane@example.com">{userDetails?.email}</a>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                        <label className="px-4 py-2 font-semibold">Date of Birth</label>
                        <div className="px-4 py-2">Feb 06, 1998</div> 
                        <DatePicker date={date} setDate={setDate} name="date" label="select date"></DatePicker>
                    </div>  */}
                </div>
            </div>
            <div className="grid md:grid-cols-2 text-sm">
                <button
                    type="button"
                    className="grid grid-cols-1 text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    onClick={() => { setIsEditing(!isEditing) }}
                >
                    cancel
                </button>
                <button
                    type="submit"
                    className="grid grid-cols-1 text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                // onClick={saveUserDetails}
                >
                    save
                </button>
            </div>
        </form>

    </>);
}

export default EditUserProfile;