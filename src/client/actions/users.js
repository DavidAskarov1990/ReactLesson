import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "../constants";

function beginLogin() {
    return { type: types.MANUAL_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        data
    }
}

function loginError() {
    return { type: types.LOGIN_ERROR_USER }
}

function logoutSuccess() {
    return { type: types.LOGIN_ERROR_USER }
}

function beginRegister() {
    return { type: types.REGISTER_USER }
}

function registerError() {
    return { type: types.REGISTER_SUCCESS_USER }
}

function makeUserRequest(method, data, api="/login") {
    return axios({
        method,
        url: api,
        data
    })
}

