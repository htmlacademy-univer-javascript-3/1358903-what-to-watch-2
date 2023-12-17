import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import { IAuth } from '../../types/api.ts';
import { login } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks/store.ts';


export const SignInPage: FC = () => {
  const dispatch = useAppDispatch();

  const [signIn, setSignIn] = useState<IAuth>({
    email: '',
    password: '',
  });


  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignIn((prevSignIn) => ({
      ...prevSignIn,
      [name]: value
    }));
  }, []);

  const handleSignIn = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(login(signIn));
  }, [dispatch, signIn]);


  return (

    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="email"
                id="user-email" value={signIn?.email}
                onChange={handleInputChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="password"
                id="user-password"
                value={signIn?.password}
                onChange={handleInputChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" onClick={handleSignIn}>Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export const SignIn = memo(SignInPage);
