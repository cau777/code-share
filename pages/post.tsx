import {NextPage} from "next";
import PostForm from "../components/post/PostForm";

const PostPage: NextPage = () => {
    return (
        <div>
            Post Snippet
            <PostForm></PostForm>
        </div>
    )
}
export default PostPage;