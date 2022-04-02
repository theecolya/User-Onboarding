import React from 'react';

const Form = (props) => {
    const { change, submit, errors } = props;
    const { username, email, password, tos } = props.values;

    const doChange = (e) => {
        const { name, value, checked, type } = e.target;
        const updatedVal = type === "checkbox" ? checked : value;
        change(name, updatedVal);
    }

    const doSubmit = (e) => {
        e.preventDefault();
        submit();
    }

    return (
        <div>
            <h1>User Onboarding</h1>
            <p>{errors.username}</p>
            <p>{errors.password}</p>
            <p>{errors.email}</p>
            <p>{errors.tos}</p>
            <form onSubmit={doSubmit}>
                <label> Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={doChange}
                    />
                </label>
                <label> Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={doChange}
                    /> 
                </label>
                <label> Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={doChange}
                    />
                </label>
                <label> Terms of Service
                    <input
                        type="checkbox"
                        name="tos"
                        checked={tos}
                        onChange={doChange}
                    />
                </label>
                <input type="submit" value="Create Account"/>
            </form>
        </div>
    )   
}

export default Form;