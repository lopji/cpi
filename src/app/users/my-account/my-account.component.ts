import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";

// @ngrx
import {Store} from "@ngrx/store";
import {go} from "@ngrx/router-store";

// rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/merge";
import {MatSort, MatSortable} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/distinctUntilChanged";

// reducers
import {
  getAuthenticatedUser,
  State
} from "../../app.reducers";

// models
import {User} from "../../core/models/user";
import {Book} from "../../core/models/book";

import {BookService} from "../../core/services/book.service";

import {DataSource} from "@angular/cdk/table";

/**
 * The user"s account.
 * @class MyAccountComponent
 */
@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"]
})
export class MyAccountComponent implements OnInit {

  // the authenticated user
  public user: Observable<User>;
  public bookData;
  public columnsBooks = ["name", "year"];

  dataSource: BookDataSource;
  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter") filter: ElementRef;

  /**
   * @constructor
   */
  constructor(private store: Store<State>, private bookService: BookService) {
    this.bookData = new BookData(bookService);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // get authenticated user
    this.user = this.store.select(getAuthenticatedUser);
    // Default sort
    this.sort.sort(<MatSortable>{
      id: "name",
      start: "asc"
    }
    );
    // Create the datasource for the table with sort and filter
    this.dataSource = new BookDataSource(this.bookData, this.sort);
    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {return;}
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  /**
   * Go to the home page.
   * @method home
   */
  public home() {
    this.store.dispatch(go("/"));
  }

  /**
   * Sign out.
   * @method home
   */
  public signOut() {
    this.store.dispatch(go("/users/sign-out"));
  }

}

/**
 * Book Data
 * @class BookData
 */
export class BookData {
  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  get data(): Book[] {return this.dataChange.value;}

  /**
   * @constructor
   */
  constructor(private bookService: BookService) {
    this.bookService.books().subscribe(data => {
      this.dataChange.next(data);
    });
  }
}


/**
 * Data show in the table
 * @class BookDataSource
 */
export class BookDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _bookData: BookData, private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Book[]> {
    const displayDataChanges = [
      this._bookData.dataChange,
      this._sort.sortChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      //Do the filter after the sort
      return this.getSortedData().slice().filter((item: Book) => {
        const searchStr = item.name.toLowerCase();
        return searchStr.startsWith(this.filter.toLowerCase());
      });
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Book[] {
    const data = this._bookData.data.slice();
    if (!this._sort.active || this._sort.direction === "") {return data;}

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "name": [propertyA, propertyB] = [a.name, b.name]; break;
        case "year": [propertyA, propertyB] = [a.year, b.year]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1);
    });
  }
}

