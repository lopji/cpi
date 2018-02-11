import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { User } from "../models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";

/**
 * The user service.
 */
@Injectable()
export class UserService {

  /**
   * True if authenticated
   * @type
   */
  private _authenticated = false;
  private user;

  constructor(private http: HttpClient) {

  }

  /**
   * Authenticate the user
   *
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public authenticate(email: string, password: string): Observable<User> {
     return this.http.post("https://reqres.in/api/login", {email: email, password: password})
      .map(res => {
         if (res.hasOwnProperty("token")) {
           this.user = new User();
           this.user.token = res["token"];
           this.user.email = email;
           this.user.password = password;
           return this.user;
         }else {
           throw new Error("Email ou mot de passe invalide");
         }
      }).catch(
        err => {
           throw new Error("Email ou mot de passe invalide");
        });
  }


  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return Observable.of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    return Observable.of(this.user);
  }

  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<boolean> {
    this._authenticated = false;
    return Observable.of(true);
  }
}
