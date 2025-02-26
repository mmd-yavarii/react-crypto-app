import { useContext, useReducer, useState } from 'react';
import { IsLoginContext } from '../../contexts/IsLoginProvider.jsx';

import { passwordRegex, emailRegex } from '../../helpers/helper.js';
import { posLogin } from '../../services/apis.js';

import styles from './LoginPage.module.css';

import PageLoading from '../../components/Loading/PageLoading.jsx';
import { replace, useNavigate } from 'react-router-dom';

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
    const [isLoading, setIsLoading] = useState(false);
    const [loginState, dispatch] = useReducer(reducer, initialState);
    const { setIsLogin, changeLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();

    const [validation, setValidation] = useState({
        email: emailRegex.test(loginState.email),
        password: passwordRegex.test(loginState.passwod),
    });

    // submit handler
    async function submitHandler(event) {
        event.preventDefault();
        if (validation.email && validation.password) {
            setIsLoading(true);
            try {
                const req = await fetch(posLogin, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: loginState.email,
                        password: loginState.passwod,
                    }),
                    headers: { 'Content-type': 'application/json' },
                });

                const json = await req.json();
                changeLogin(loginState.remember, json.token);

                navigate('/', { replace: true });
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
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
        <>
            {isLoading && <PageLoading />}
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
                            value={loginState.email}
                            name="email"
                            onChange={textInputHandler}
                        />
                        <input
                            className={
                                validation.password
                                    ? styles.valid
                                    : styles.invalid
                            }
                            type="password"
                            placeholder="Enter Your Password"
                            value={loginState.password}
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
                            checked={loginState.remember}
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
                        {/* <a href="">Don't have an acount</a> */}
                        <button
                            type="submit"
                            className={
                                !validation.password && !validHandler.email
                                    ? styles.unableBtn
                                    : null
                            }
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
