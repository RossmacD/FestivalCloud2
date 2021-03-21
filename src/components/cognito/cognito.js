import axios from "../../api/index";
// src/cognito/cognito.js
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";

const cognitoConfig = {
  region: "eu-east-1",
  IdentityPoolId: "us-east-1_2F6n12wdW",
  UserPoolId: "us-east-1:131871537115",
  ClientId: "13jfs0lk3c3lms4pgjmkvkvchq"
};

export default class CognitoAuth {
  constructor() {
    this.userSession = null;
    this.options = cognitoConfig;
    this.configure();
  }
  isAuthenticated(cb) {
    let cognitoUser = this.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(err => {
        if (err) {
          return cb(err, false);
        }
        return cb(null, true);
      });
    } else {
      cb(null, false);
    }
  }

  configure() {
    this.userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.IdentityPoolId,
      ClientId: cognitoConfig.ClientId
    });
    Config.region = cognitoConfig.region;
    Config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: cognitoConfig.IdentityPoolId
    });
    this.options = cognitoConfig;
  }

  signup(username, email, pass, cb) {
    let attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email
      })
    ];

    this.userPool.signUp(username, pass, attributeList, null, cb);
  }

  authenticate(username, pass, cb) {
    let authenticationData = { Username: username, Password: pass };
    let authenticationDetails = new AuthenticationDetails(authenticationData);
    let userData = { Username: username, Pool: this.userPool };
    let cognitoUser = new CognitoUser(userData);
    let options = this.options;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        var logins = {};
        logins[
          "cognito-idp." +
            options.region +
            ".amazonaws.com/" +
            options.UserPoolId
        ] = result.getIdToken().getJwtToken();
        console.log(logins);
        let token = result.getIdToken().getJwtToken();
        if (token) {
          console.log("Setting token");
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // Vue.prototype.$auth;
        }
        Config.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: options.UserPoolId,
          Logins: logins
        });
        console.log(Config.credentials);
        // this.onChange(true)
        cb(null, result);
      },
      onFailure: function(err) {
        cb(err);
      },
      newPasswordRequired: function() {
        console.log("New Password Is Required");
      }
    });
  }

  getCurrentUser() {
    return this.userPool.getCurrentUser();
  }

  confirmRegistration(username, code, cb) {
    let cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    });
    cognitoUser.confirmRegistration(code, true, cb);
  }

  /**
   * Logout of your cognito session.
   */
  logout() {
    this.getCurrentUser().signOut();
    // this.onChange(false)
  }

  /**
   * Resolves the current token based on a user session. If there
   * is no session it returns null.
   * @param {*} cb callback
   */
  getIdToken(cb) {
    if (this.getCurrentUser() == null) {
      return cb(null, null);
    }
    this.getCurrentUser().getSession((err, session) => {
      if (err) return cb(err);
      if (session.isValid()) {
        return cb(null, session.getIdToken().getJwtToken());
      }
      cb(Error("Session is invalid"));
    });
  }
}
