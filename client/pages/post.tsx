import {NextPage} from "next";
import PostForm from "../components/post/PostForm";
import Head from "next/head";
import {AppName} from "../src/styling";

const PostPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Post Snippet {AppName}</title>
            </Head>
            <PostForm></PostForm>
        </div>
    )
}
export default PostPage;