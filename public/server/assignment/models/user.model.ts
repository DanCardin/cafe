/// <reference path="../../../typings/main.d.ts"/>

import q = require('q');
import mongoose = require('mongoose');

import {IUser, UserSchema} from './user.schema';

let User = mongoose.model('User', UserSchema);

// mongoose.Promise = q.Promise;

export module UserModel {
    export function findUserByUsername(username: string) {
        return User.findOne({username: username}).exec();
    }

    export function findUserById(userId: string) {
        return User.findById(userId).exec();
    }

    export function findUserByCredentials(credentials) {
        let deferred = q.defer();
        findUserByUsername(credentials.username)
            .then((doc) => {
                if (doc['username'] === credentials.password) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject('Invalid Password');
                }
            });
        return deferred.promise;
    }

    export function createUser(newUser) {
        var deferred = q.defer();

        let userObject: IUser = {
            username: newUser.username,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        };
        let user = new User(userObject);

        user.save((err, doc) => {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    export function getAllUsers() {
        return User.find({}).exec();
    }

    export function updateUser(userId: string, newUser) {
        return User.findByIdAndUpdate(userId, newUser, {new: true}).exec();
    }

    export function deleteUser(userId: string) {
        return User.findByIdAndRemove(userId).exec();
    }
}
