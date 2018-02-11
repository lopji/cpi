import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Book } from "../models/book";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {

  }

  public books(): Observable<Book[]> {
    return this.http.get("https://reqres.in/api/books?per_page=12")
        .map(res => {
          return res["data"].map(book => {
            return new Book(book["name"], book["year"]);
          });
        });
  }


}
