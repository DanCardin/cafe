import {Component} from "angular2/core";
import {RouteConfig, Router, RouterLink, RouterOutlet} from "angular2/router";

import {PathAware} from "../path-aware.component";

import {User, UserService} from "../../services/UserService";

@Component({
    directives: [RouterLink, RouterOutlet],
    selector: "header",
    templateUrl: "app/views/header/header.view.html",
})
export class Header extends PathAware {
    userService: UserService;
    constructor(
        router: Router,
        userService: UserService
    ) {
        super(router);

        this.userService = userService;
    }

    logout() {
        this.userService.currentUser = null;
        this.router.navigate(["/Login"]);
    }
}