import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/components/interfaces";

@Pipe({
    name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {

    transform(posts: Post[], searchStr = '') {
        if (!searchStr.trim()) {
            return posts
        }

        return posts.filter(post => {
            return post.title.toLowerCase().includes(searchStr.toLocaleLowerCase())
        })
    }
}