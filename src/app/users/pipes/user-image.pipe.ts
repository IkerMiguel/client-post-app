import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../../environments/environment.development";


const baseUrl = environment.apiURL;

@Pipe({
    name: 'userImage',
})
export class UserImagePipe implements PipeTransform {
    transform(value: string):string {
        return `${baseUrl}/users/avatar/${value}`;
    }
}