import { create } from "zustand";

export const useAccountStore = create((set)=>({
    user: [],
    setUser: (user) => set({user}),
    createUser: async (newUser) => {

        if(!newUser)
            return {success: false, message: "User registration failed!"}

    },

    login: async (user) =>{

        if(!user.email || !user.password)
            return("Please fill the fields!");

        const res = await fetch("/api/user/login",{
            method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
        });
        const data = await res.json();

        console.warn("dat : ", data)
        set((state) => ({user: [...state.user, data.data]}));
        return { success: true, message : "Logged in successful!"}
    }
}))