'use strict';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as fetch from "node-fetch";
import * as FormData from "form-data";

const apiUrl = 'https://api.quarkspark.com/';

export class api_qs{
    static login(data){
        return new Promise((resolve:Function, reject:Function) => {
            const form = new FormData();
            form.append('application_key', data.application_key);
            form.append('email', data.email);
            form.append('password', data.password);
    
            const url = apiUrl+'session/auth';
            fetch(url, {
            method: 'POST', 
            body: form
            }).then(res => res.json())
            .catch(error => reject(error))
            .then(response => resolve(response));
        })        
    }

    static register(data){
        return new Promise((resolve:Function, reject:Function) => {
            const form = new FormData();
            form.append('email', data.email);
            form.append('password1', data.password1);
            form.append('password2', data.password2);
            form.append('first_name', data.first_name);
            form.append('last_name', data.last_name);
            form.append('terms', data.terms);
            const url = apiUrl+'user/register';
            fetch(url, {
            method: 'POST', 
            body: form
            }).then(res => res.json())
            .catch(error => reject(error))
            .then(response => resolve(response));
        })        
    }

	static checkSessionAuth(app_key, ses_key, usr_email){
        return new Promise((resolve:Function, reject:Function) => {
            const form = new FormData();
            form.append('application_key', app_key);
            form.append('session_key', ses_key);
            form.append('user_email', usr_email);
    
            const url = apiUrl+'session/check';
            fetch(url, {
            method: 'POST', 
            body: form
            }).then(res => res.json())
            .catch(error => reject(error))
            .then(response => resolve(response));
        })        
    }

    static renewSession(app_key, ses_key, usr_id){
        return new Promise((resolve:Function, reject:Function) => {
            const form = new FormData();
            form.append('application_key', app_key);
            form.append('session_key', ses_key);
            form.append('uuid', usr_id);
    
            const url = apiUrl+'session/renew';
            fetch(url, {
            method: 'POST', 
            body: form
            }).then(res => res.json())
            .catch(error => reject(error))
            .then(response => resolve(response));
        })        
    }

    static detailsSession(app_key, ses_key, usr_id){
        return new Promise((resolve:Function, reject:Function) => {
            console.log(app_key, ses_key, usr_id);
            const form = new FormData();
            form.append('application_key', app_key);
            form.append('session_key', ses_key);
            form.append('uuid', usr_id);
    
            const url = apiUrl+'session/details';
            fetch(url, {
            method: 'POST', 
            body: form
            }).then(res => res.json())
            .catch(error => reject(error))
            .then(response => resolve(response));
        })        
    }
}