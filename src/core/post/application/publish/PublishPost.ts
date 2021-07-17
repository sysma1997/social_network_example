import { UserId } from "../../../user/domain/UserId";
import { Post } from "../../domain/Post";
import { PostDate } from "../../domain/PostDate";
import { PostDescription } from "../../domain/PostDescription";
import { PostDto } from "../../domain/PostDto";
import { PostId } from "../../domain/PostId";
import { PostImage } from "../../domain/PostImage";
import { PostTitle } from "../../domain/PostTitle";
import { PostPublishRepository } from "./PostPublishRepository";

export class PublishPost {
    private repository: PostPublishRepository

    constructor(repository: PostPublishRepository) {
        this.repository = repository
    }

    public async init(postDto: PostDto): Promise<void> {
        return await this.repository.publish(new Post(
            new PostId(postDto.id), 
            new UserId(postDto.userId), 
            new PostTitle(postDto.title), 
            new PostDescription(postDto.description), 
            new PostDate(postDto.date), 
            new PostImage(postDto.image)
        ))
    }
}