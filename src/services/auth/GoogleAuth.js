import React, { useEffect } from "react";
import { signIn, signOut } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const GoogleAuth = () => {
  const { auth } = useSelector((store) => {
    return store.session;
  });
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleGoogleApi = (callback) => {
    window.gapi.load("client:auth2", async () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          callback(auth);
        });
    });
  };

  useEffect(() => {
    handleGoogleApi(() => {});
    loadUserStateToStore();
  });

  const saveSignedInState = (userId) => {
    dispatch(signIn(userId));
    console.log(t("auth.isSignedIn"));
  };

  const saveSignOutState = () => {
    dispatch(signOut());
    console.log(t("auth.isSignedOut"));
  };

  const onSignInClick = async () => {
    handleGoogleApi(async (auth) => {
      await auth.signIn();

      if (auth.isSignedIn.get()) {
        saveSignedInState(auth.currentUser.get().getId());
      }
    });
  };

  const onSignOutClick = async () => {
    handleGoogleApi(async (auth) => {
      await auth.signOut();

      if (!auth.isSignedIn.get()) {
        saveSignOutState();
      }
    });
  };

  const loadUserStateToStore = async () => {
    const storeState = auth.isSignedIn;

    handleGoogleApi(async (auth) => {
      const isSignedIn = await auth.isSignedIn.get();
      const isSyncronized = isSignedIn === storeState;

      if (isSyncronized) {
        return;
      }

      if (isSignedIn) {
        saveSignedInState(auth.currentUser.get().getId());
      } else {
        saveSignOutState();
      }
    });
  };

  const renderSignInButton = () => {
    return (
      <button onClick={onSignOutClick} className="ui red google button">
        <i className="google icon" />
        {t("auth.signIn")}
      </button>
    );
  };

  const renderSignOutButton = () => {
    return (
      <button onClick={onSignInClick} className="ui red google button">
        <i className="google icon" />
        {t("auth.signOut")}
      </button>
    );
  };

  const renderAuthButton = () => {
    if (auth.isSignedIn === true) {
      return renderSignInButton();
    } else {
      return renderSignOutButton();
    }
  };

  return <>{renderAuthButton()}</>;
};

export default GoogleAuth;
