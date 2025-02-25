import { useEffect, useReducer, useState } from 'react';

import { passwordRegex, emailRegex } from '../../helpers/helper.js';

import styles from './LoginPage.module.css';

const initialState = {
    email: 'eve.holt@reqres.in',
    passwod: '',
    remember: true,
};

function reducer(state, action) {
    switch (action.type) {
        case 'REMEMBER':
            return { ...state, remember: !state.remember };

        case 'EMAIL':
            return { ...state, email: action.payload };

        case 'PASWORD':
            return { ...state, passwod: action.payload };
    }
}

function LoginPage() {
    const [loginForm, dispatch] = useReducer(reducer, initialState);

    const [validation, setValidation] = useState({
        email: emailRegex.test(loginForm.email),
        password: passwordRegex.test(loginForm.passwod),
    });

    // submit handler
    function submitHandler(event) {
        event.preventDefault();
        if (validation.email && validation.password) {
            console.log(loginForm);
        }
    }

    // text input validtion
    function validHandler(inputName, value) {
        const regex = inputName == 'email' ? emailRegex : passwordRegex;

        setValidation((state) => ({
            ...state,
            [inputName]: regex.test(value),
        }));
    }

    // text input handler
    function textInputHandler(event) {
        const key = event.target.name;
        const value = event.target.value;

        if (key == 'email') {
            dispatch({
                type: 'EMAIL',
                payload: value,
            });
        } else {
            dispatch({
                type: 'PASWORD',
                payload: value,
            });
        }
        validHandler(key, value);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler}>
                {/* inputs */}
                <div>
                    <input
                        className={
                            validation.email ? styles.valid : styles.invalid
                        }
                        type="text"
                        placeholder="Enter Your Email"
                        value={loginForm.email}
                        name="email"
                        onChange={textInputHandler}
                    />
                    <input
                        className={
                            validation.password ? styles.valid : styles.invalid
                        }
                        type="password"
                        placeholder="Enter Your Password"
                        value={loginForm.password}
                        name="password"
                        onChange={textInputHandler}
                    />
                </div>

                {/* remember me  */}
                <div className={styles.remember}>
                    <label htmlFor="remember">Remember Me</label>
                    <input
                        type="checkbox"
                        id="remember"
                        checked={loginForm.remember}
                        onChange={() => dispatch({ type: 'REMEMBER' })}
                    />
                </div>

                {/* rulls */}
                <div className={styles.rullsContainer}>
                    <span className={styles.rulls}>
                        The password must not include characters like @,$,#
                    </span>
                    <span className={styles.rulls}>
                        password must have 8 charecters
                    </span>
                    <span className={styles.rulls}>
                        password must have Alphabet charecters
                    </span>
                </div>

                {/* buttons of sign up and submit */}
                <div className={styles.btnContainer}>
                    <a href="">Don't have an acount</a>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
