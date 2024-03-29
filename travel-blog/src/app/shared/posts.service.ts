import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Post } from "./components/interfaces";

@Injectable({
    providedIn: 'root'
})

export class PostsService {
    constructor(private http: HttpClient) {
    }

    create(post: Post): Observable<any> {
        return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                }
            }))
    }

    getAllPosts(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object.keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key,
                            date: new Date(response[key].date)
                        }))

                }))
    }

    removePost(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }
}