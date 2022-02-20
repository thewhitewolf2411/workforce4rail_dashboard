import React from 'react';
import agent from '../../app/api/agent';

export default function LoginForm() {

    const loginFunction = async (e) =>{
        e.preventDefault();
        await agent.Account.login({email: 'someemail@gmail.com', password: 'somepassword'});
    }

    return (
        <form onSubmit={loginFunction}>
            <input type="submit" value="Login" />
        </form>
    )
}